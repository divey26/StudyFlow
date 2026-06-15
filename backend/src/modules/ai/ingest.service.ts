import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class IngestService {
  private readonly logger = new Logger(IngestService.name);

  async extractText(input: { text?: string; url?: string }): Promise<string> {
    if (input.text && input.text.trim().length >= 20) {
      return input.text.trim();
    }

    if (input.url) {
      const url = input.url.trim();

      // YouTube support — extract video ID and fetch transcript via a free proxy
      const youtubeId = this.extractYouTubeId(url);
      if (youtubeId) {
        return this.fetchYouTubeTranscript(youtubeId);
      }

      // General webpage scraping
      return this.scrapeUrl(url);
    }

    throw new BadRequestException('Provide either text (min 20 chars) or a valid URL.');
  }

  private extractYouTubeId(url: string): string | null {
    const patterns = [
      /[?&]v=([^&]+)/,
      /youtu\.be\/([^?]+)/,
      /youtube\.com\/embed\/([^?]+)/,
      /youtube\.com\/shorts\/([^?]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  private async fetchYouTubeTranscript(videoId: string): Promise<string> {
    try {
      // Fetch video info page to get title + description as fallback
      const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });
      if (!response.ok) throw new Error('YouTube fetch failed');
      const html = await response.text();
      const $ = cheerio.load(html);

      // Extract title and meta description from the page
      const title = $('title').text().replace(' - YouTube', '').trim();
      const description = $('meta[name="description"]').attr('content') ?? '';

      // Try to extract ytInitialData for video description
      const dataMatch = html.match(/var ytInitialData = ({.+?});<\/script>/s);
      let videoDesc = '';
      if (dataMatch) {
        try {
          const ytData = JSON.parse(dataMatch[1]);
          const descRuns =
            ytData?.contents?.twoColumnWatchNextResults?.results?.results?.contents?.[1]?.videoSecondaryInfoRenderer
              ?.description?.runs;
          if (Array.isArray(descRuns)) {
            videoDesc = descRuns.map((r: any) => r.text ?? '').join('');
          }
        } catch {
          // ignore parse errors
        }
      }

      const combined = `YouTube Video: ${title}\n\n${videoDesc || description}`.trim();
      if (combined.length < 30) {
        throw new Error('Insufficient content extracted from YouTube');
      }

      this.logger.log(`Extracted ${combined.length} chars from YouTube video ${videoId}`);
      return combined;
    } catch (err) {
      this.logger.error('YouTube extraction failed', err);
      throw new BadRequestException('Could not extract content from this YouTube video. Try pasting the description as text instead.');
    }
  }

  private async scrapeUrl(url: string): Promise<string> {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // Remove non-content elements
      $('script, style, nav, footer, header, aside, [role="banner"], [role="navigation"], .cookie-banner, #cookie').remove();

      // Prefer article/main content
      const contentSelectors = ['article', 'main', '[role="main"]', '.content', '#content', '.post-content', 'body'];
      let text = '';
      for (const selector of contentSelectors) {
        const el = $(selector);
        if (el.length) {
          text = el
            .text()
            .replace(/\s+/g, ' ')
            .trim();
          if (text.length > 200) break;
        }
      }

      if (text.length < 50) {
        throw new Error('Not enough readable content');
      }

      this.logger.log(`Scraped ${text.length} chars from ${url}`);
      return text.slice(0, 8000);
    } catch (err) {
      this.logger.error(`Scraping failed for ${url}`, err);
      throw new BadRequestException(
        `Could not read content from that URL. Try pasting the text directly instead.`,
      );
    }
  }
}
