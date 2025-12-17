import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTrustDto } from './dto/create-trust.dto';
import { UpdateTrustDto } from './dto/update-trust.dto';

@Injectable()
export class TrustService {
  private prisma = new PrismaClient();

  async create(data: CreateTrustDto) {
    return this.prisma.trust.create({
      data: {
        name: data.name,
        imageUrl: data.imageUrl,
        order: data.order || 0,
        isActive: data.isActive ?? true,
      },
    });
  }

  async findAll() {
    return this.prisma.trust.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    const trust = await this.prisma.trust.findUnique({
      where: { id },
    });
    if (!trust) throw new NotFoundException('Trust not found');
    return trust;
  }

  async update(id: number, data: UpdateTrustDto) {
    await this.findOne(id);
    return this.prisma.trust.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.trust.delete({ where: { id } });
  }
}