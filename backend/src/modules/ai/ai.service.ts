import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NodeType } from '@prisma/client';

type GeneratedNode = {
  label: string;
  type: NodeType;
  description: string;
  parentLabel: string | null;
};

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private gemini: GoogleGenerativeAI | null = null;

  constructor(private readonly config: ConfigService) {
    const apiKey = this.config.get<string>('AI_API_KEY');
    if (apiKey) {
      this.gemini = new GoogleGenerativeAI(apiKey);
      this.logger.log('Gemini AI provider initialised');
    } else {
      this.logger.warn('No AI_API_KEY set - using mock AI responses');
    }
  }

  async generateMindMap(topic: string, context?: string) {
    if (this.gemini) {
      try {
        return await this.geminiMindMap(topic, context);
      } catch (err: any) {
        const msg = err?.message ?? String(err);
        this.logger.error('Gemini generateMindMap failed: ' + msg);
        throw new InternalServerErrorException('Gemini API error: ' + msg);
      }
    }
    return this.mockMindMap(topic);
  }

  async expandNode(label: string, context?: string) {
    if (this.gemini) {
      try {
        return await this.geminiExpand(label, context);
      } catch (err: any) {
        const msg = err?.message ?? String(err);
        this.logger.error('Gemini expandNode failed: ' + msg);
        throw new InternalServerErrorException('Gemini API error: ' + msg);
      }
    }
    return this.mockExpansion(label, context);
  }

  async generateFromText(text: string) {
    const truncated = text.slice(0, 6000);
    if (this.gemini) {
      try {
        return await this.geminiFromText(truncated);
      } catch (err: any) {
        const msg = err?.message ?? String(err);
        this.logger.error('Gemini generateFromText failed: ' + msg);
        throw new InternalServerErrorException('Gemini API error: ' + msg);
      }
    }
    // Fallback: use the first line as a topic
    const topic = text.split('\n').find((l) => l.trim().length > 3) ?? 'Extracted Content';
    return this.mockMindMap(topic.slice(0, 60));
  }

  // Gemini implementations

  private async geminiMindMap(topic: string, context?: string) {
    const model = this.gemini!.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const prompt = `
You are a study flow generator. Create a structured visual learning path for the topic: "${topic}"${context ? ` with context: "${context}"` : ''}.

Return a JSON object with this exact shape:
{
  "title": "string",
  "nodes": [
    { "label": "string", "type": "TOPIC|SUBTOPIC|TASK|RESOURCE|NOTE", "description": "string", "parentLabel": null | "string" }
  ]
}

Rules:
- First node: type TOPIC, parentLabel null, label = the root topic
- 6-10 SUBTOPIC nodes with parentLabel = root topic label
- 2-4 TASK or RESOURCE nodes as children of subtopics
- Each node must have a 1-2 sentence description
- Return ONLY valid JSON, no markdown, no explanation
`.trim();

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const json = text.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    return JSON.parse(json) as { title: string; nodes: GeneratedNode[] };
  }

  private async geminiExpand(label: string, context?: string) {
    const model = this.gemini!.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const prompt = `
You are a study flow assistant. Suggest 3-5 child nodes to expand the concept: "${label}"${context ? ` in the context of "${context}"` : ''}.

Return a JSON object with this exact shape:
{
  "suggestions": [
    { "label": "string", "type": "SUBTOPIC|TASK|RESOURCE|NOTE", "description": "string" }
  ]
}

Rules:
- Suggestions must be specific and actionable
- Each description should be 1-2 sentences
- Return ONLY valid JSON, no markdown, no explanation
`.trim();

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const json = text.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    return JSON.parse(json) as { suggestions: Array<{ label: string; type: NodeType; description: string }> };
  }

  private async geminiFromText(text: string) {
    const model = this.gemini!.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const prompt = `
You are a study flow generator. Extract and structure key concepts from the following content into a visual learning path.

CONTENT:
${text}

Return a JSON object with this exact shape:
{
  "title": "string (the main topic inferred from the content)",
  "nodes": [
    { "label": "string", "type": "TOPIC|SUBTOPIC|TASK|RESOURCE|NOTE", "description": "string", "parentLabel": null | "string" }
  ]
}

Rules:
- First node: type TOPIC, parentLabel null
- 5-10 SUBTOPIC nodes representing key themes
- 2-4 deeper child nodes for important details
- Return ONLY valid JSON, no markdown, no explanation
`.trim();

    const result = await model.generateContent(prompt);
    const text2 = result.response.text().trim();
    const json = text2.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    return JSON.parse(json) as { title: string; nodes: GeneratedNode[] };
  }

  // Mock fallbacks

  private mockMindMap(topic: string): { title: string; nodes: GeneratedNode[] } {
    const root = topic.trim();
    const base = [
      ['Programming Basics', 'Learn core programming concepts and problem solving.'],
      ['HTML and CSS', 'Build semantic pages and responsive visual layouts.'],
      ['JavaScript', 'Understand language fundamentals, async code, and browser APIs.'],
      ['React', 'Create component-driven interfaces with state and routing.'],
      ['Node.js', 'Build server-side applications and APIs with TypeScript.'],
      ['Databases', 'Model, query, and maintain relational data.'],
      ['API Development', 'Design REST endpoints, validation, and documentation.'],
      ['Authentication', 'Protect user accounts with JWT and secure password storage.'],
      ['Deployment', 'Ship frontend, backend, and database services to cloud platforms.'],
      ['Projects', 'Build portfolio projects that combine the full stack.'],
    ] as const;

    return {
      title: root,
      nodes: [
        { label: root, type: NodeType.TOPIC, description: `Central roadmap for ${root}.`, parentLabel: null },
        ...base.map(([label, description]) => ({
          label,
          description,
          type: label === 'Projects' ? NodeType.TASK : NodeType.SUBTOPIC,
          parentLabel: root,
        })),
      ],
    };
  }

  private mockExpansion(label: string, context?: string) {
    const normalized = label.toLowerCase();
    const suggestions =
      normalized.includes('react')
        ? [
            ['React Hooks', 'useState, useEffect, useMemo, useCallback, and custom hooks.'],
            ['React Router', 'Routing, nested layouts, loaders, and navigation patterns.'],
            ['Component Design', 'Reusable UI components, props, composition, and accessibility.'],
          ]
        : [
            [`${label} Fundamentals`, `Core ideas and vocabulary for ${label}.`],
            [`${label} Practice Plan`, `Hands-on tasks to apply ${label}${context ? ` in ${context}` : ''}.`],
            [`${label} Resources`, `Docs, courses, articles, and references for continued learning.`],
          ];

    return {
      suggestions: suggestions.map(([childLabel, description]) => ({
        label: childLabel,
        type: childLabel.includes('Resources') ? NodeType.RESOURCE : NodeType.SUBTOPIC,
        description,
      })),
    };
  }
}
