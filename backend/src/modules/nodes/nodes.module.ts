import { Module } from '@nestjs/common';
import { MindmapsModule } from '../mindmaps/mindmaps.module';
import { NodesController } from './nodes.controller';
import { NodesService } from './nodes.service';

@Module({
  imports: [MindmapsModule],
  controllers: [NodesController],
  providers: [NodesService],
})
export class NodesModule {}
