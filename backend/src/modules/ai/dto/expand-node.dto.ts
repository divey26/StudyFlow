import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class ExpandNodeDto {
  @ApiProperty({ example: 'React' })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  label: string;

  @ApiPropertyOptional({ example: 'Frontend roadmap' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  context?: string;
}
