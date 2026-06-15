import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUser } from '../auth/types/auth-user.type';
import { CreateMindmapDto } from './dto/create-mindmap.dto';
import { UpdateMindmapDto } from './dto/update-mindmap.dto';
import { MindmapsService } from './mindmaps.service';

@ApiTags('mindmaps')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('mindmaps')
export class MindmapsController {
  constructor(private readonly mindmapsService: MindmapsService) {}

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateMindmapDto) {
    return this.mindmapsService.create(user.id, dto);
  }

  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.mindmapsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.mindmapsService.findOne(user.id, id);
  }

  @Patch(':id')
  update(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: UpdateMindmapDto) {
    return this.mindmapsService.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.mindmapsService.remove(user.id, id);
  }
}
