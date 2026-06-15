import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AiService } from './ai.service';
import { IngestService } from './ingest.service';
import { ExpandNodeDto } from './dto/expand-node.dto';
import { GenerateMindmapDto } from './dto/generate-mindmap.dto';
import { IngestDto } from './dto/ingest.dto';

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly ingestService: IngestService,
  ) {}

  @Post('generate-mindmap')
  @ApiOperation({ summary: 'Generate a study flow from a topic string' })
  generateMindmap(@Body() dto: GenerateMindmapDto) {
    return this.aiService.generateMindMap(dto.topic, dto.context);
  }

  @Post('expand-node')
  @ApiOperation({ summary: 'Expand a single node with AI-suggested children' })
  expandNode(@Body() dto: ExpandNodeDto) {
    return this.aiService.expandNode(dto.label, dto.context);
  }

  @Post('ingest')
  @ApiOperation({ summary: 'Convert a URL or raw text into a study flow' })
  async ingest(@Body() dto: IngestDto) {
    const text = await this.ingestService.extractText({ text: dto.text, url: dto.url });
    return this.aiService.generateFromText(text);
  }
}
