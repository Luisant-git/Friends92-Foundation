import { Injectable, NotFoundException } from '@nestjs/common';

import { CreatePlacementDto } from './dto/create-placement.dto';
import { UpdatePlacementDto } from './dto/update-placement.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PlacementService {
   private prisma = new PrismaClient();

  async create(createPlacementDto: CreatePlacementDto) {
    return await this.prisma.placement.create({
      data: {
        ...createPlacementDto,
       
      },
    });
  }

  async findAll() {
    return await this.prisma.placement.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
  
 async findActive() {
    return await this.prisma.placement.findMany({
      orderBy: { createdAt: 'desc' },
      where: { status: true },
    });
  }
  async findOne(id: number) {
    const placement = await this.prisma.placement.findUnique({ where: { id } });

    if (!placement) {
      throw new NotFoundException('Placement not found');
    }

    return placement;
  }

  async update(id: number, updatePlacementDto: UpdatePlacementDto) {
    const exists = await this.prisma.placement.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException('Placement not found');
    }

    return this.prisma.placement.update({
      where: { id },
      data: updatePlacementDto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.placement.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException('Placement not found');
    }

    return this.prisma.placement.delete({ where: { id } });
  }
}
