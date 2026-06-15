import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class IngestDto {
  @ApiPropertyOptional({ description: 'Raw text to convert into a study flow' })
  @IsOptional()
  @IsString()
  @MinLength(20)
  text?: string;

  @ApiPropertyOptional({ description: 'Public URL (webpage or YouTube) to convert into a study flow' })
  @IsOptional()
  @IsString()
  url?: string;
}
