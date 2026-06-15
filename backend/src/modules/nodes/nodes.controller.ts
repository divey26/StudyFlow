import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUser } from '../auth/types/auth-user.type';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { NodesService } from './nodes.service';

@ApiTags('nodes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Post('mindmaps/:mindMapId/nodes')
  create(@CurrentUser() user: AuthUser, @Param('mindMapId') mindMapId: string, @Body() dto: CreateNodeDto) {
    return this.nodesService.create(user.id, mindMapId, dto);
  }

  @Get('mindmaps/:mindMapId/nodes')
  findForMindmap(@CurrentUser() user: AuthUser, @Param('mindMapId') mindMapId: string) {
    return this.nodesService.findForMindmap(user.id, mindMapId);
  }

  @Patch('nodes/:id')
  update(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: UpdateNodeDto) {
    return this.nodesService.update(user.id, id, dto);
  }

  @Delete('nodes/:id')
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.nodesService.remove(user.id, id);
  }
}
