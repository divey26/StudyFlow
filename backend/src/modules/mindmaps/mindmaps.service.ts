import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMindmapDto } from './dto/create-mindmap.dto';
import { UpdateMindmapDto } from './dto/update-mindmap.dto';

@Injectable()
export class MindmapsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateMindmapDto) {
    return this.prisma.mindMap.create({
      data: { ...dto, userId },
      include: { nodes: true },
    });
  }

  findAll(userId: string) {
    return this.prisma.mindMap.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      include: { _count: { select: { nodes: true } } },
    });
  }

  async findOne(userId: string, id: string) {
    const mindMap = await this.prisma.mindMap.findFirst({
      where: { id, userId },
      include: { nodes: { orderBy: { createdAt: 'asc' } } },
    });
    if (!mindMap) {
      throw new NotFoundException('Mind map not found');
    }
    return mindMap;
  }

  async update(userId: string, id: string, dto: UpdateMindmapDto) {
    await this.ensureOwner(userId, id);
    return this.prisma.mindMap.update({ where: { id }, data: dto });
  }

  async remove(userId: string, id: string) {
    await this.ensureOwner(userId, id);
    await this.prisma.mindMap.delete({ where: { id } });
    return { success: true };
  }

  async ensureOwner(userId: string, mindMapId: string) {
    const count = await this.prisma.mindMap.count({ where: { id: mindMapId, userId } });
    if (!count) {
      throw new NotFoundException('Mind map not found');
    }
  }
}
