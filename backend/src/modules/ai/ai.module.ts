import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { IngestService } from './ingest.service';

@Module({
  controllers: [AiController],
  providers: [AiService, IngestService],
})
export class AiModule {}
