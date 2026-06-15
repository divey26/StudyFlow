import { PartialType } from '@nestjs/swagger';
import { CreateMindmapDto } from './create-mindmap.dto';

export class UpdateMindmapDto extends PartialType(CreateMindmapDto) {}
