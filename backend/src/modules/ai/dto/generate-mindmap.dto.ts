import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class GenerateMindmapDto {
  @ApiProperty({ example: 'Full Stack Developer Roadmap' })
  @IsString()
  @MinLength(2)
  @MaxLength(160)
  topic: string;

  @ApiPropertyOptional({ example: 'Focus on practical web development skills' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  context?: string;
}
