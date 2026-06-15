import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NodeType } from '@prisma/client';
import { IsEnum, IsHexColor, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateNodeDto {
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  parentId?: string | null;

  @ApiProperty({ example: 'React' })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  label: string;

  @ApiPropertyOptional({ example: 'Frontend JavaScript library' })
  @IsOptional()
  @IsString()
  @MaxLength(700)
  description?: string;

  @ApiProperty({ enum: NodeType, example: NodeType.TOPIC })
  @IsEnum(NodeType)
  type: NodeType;

  @ApiPropertyOptional({ example: '#6366f1' })
  @IsOptional()
  @IsHexColor()
  color?: string;

  @ApiProperty({ example: 200 })
  @IsNumber()
  xPosition: number;

  @ApiProperty({ example: 150 })
  @IsNumber()
  yPosition: number;
}
