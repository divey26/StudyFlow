import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMindmapDto {
  @ApiProperty({ example: 'Machine Learning Roadmap' })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  title: string;

  @ApiPropertyOptional({ example: 'A roadmap for learning machine learning' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
