import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  private prisma = new PrismaClient();

  async create(data: CreateTeamDto) {
    return this.prisma.team.create({
      data: {
        name: data.name,
        designation: data.designation,
        phone: data.phone,
        description: data.description,
        imageUrl: data.imageUrl,
        order: data.order || 0,
        isActive: data.isActive ?? true,
      },
    });
  }

  async findAll() {
    return this.prisma.team.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    const team = await this.prisma.team.findUnique({
      where: { id },
    });
    if (!team) throw new NotFoundException('Team member not found');
    return team;
  }

  async update(id: number, data: UpdateTeamDto) {
    await this.findOne(id);
    return this.prisma.team.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.team.delete({ where: { id } });
  }
}