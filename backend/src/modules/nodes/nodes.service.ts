import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MindmapsService } from '../mindmaps/mindmaps.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';

@Injectable()
export class NodesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mindmapsService: MindmapsService,
  ) {}

  async create(userId: string, mindMapId: string, dto: CreateNodeDto) {
    await this.mindmapsService.ensureOwner(userId, mindMapId);
    if (dto.parentId) {
      await this.ensureNodeInMindmap(dto.parentId, mindMapId);
    }

    return this.prisma.mindMapNode.create({
      data: {
        mindMapId,
        parentId: dto.parentId ?? null,
        label: dto.label,
        description: dto.description,
        type: dto.type,
        color: dto.color,
        xPosition: dto.xPosition,
        yPosition: dto.yPosition,
      },
    });
  }

  async findForMindmap(userId: string, mindMapId: string) {
    await this.mindmapsService.ensureOwner(userId, mindMapId);
    return this.prisma.mindMapNode.findMany({
      where: { mindMapId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async update(userId: string, id: string, dto: UpdateNodeDto) {
    const node = await this.findOwnedNode(userId, id);
    if (dto.parentId) {
      if (dto.parentId === id) {
        throw new BadRequestException('A node cannot be its own parent');
      }
      await this.ensureNodeInMindmap(dto.parentId, node.mindMapId);
    }

    return this.prisma.mindMapNode.update({
      where: { id },
      data: {
        ...dto,
        parentId: dto.parentId === undefined ? undefined : dto.parentId,
      },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOwnedNode(userId, id);
    await this.prisma.mindMapNode.updateMany({
      where: { parentId: id },
      data: { parentId: null },
    });
    await this.prisma.mindMapNode.delete({ where: { id } });
    return { success: true };
  }

  private async findOwnedNode(userId: string, id: string) {
    const node = await this.prisma.mindMapNode.findFirst({
      where: { id, mindMap: { userId } },
    });
    if (!node) {
      throw new NotFoundException('Node not found');
    }
    return node;
  }

  private async ensureNodeInMindmap(nodeId: string, mindMapId: string) {
    const count = await this.prisma.mindMapNode.count({ where: { id: nodeId, mindMapId } });
    if (!count) {
      throw new BadRequestException('Parent node must belong to the same study flow');
    }
  }
}
