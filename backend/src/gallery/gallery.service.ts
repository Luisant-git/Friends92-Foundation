import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GalleryService {
  private prisma = new PrismaClient();

  async create(data: CreateGalleryDto) {
    return await this.prisma.gallery.create({ data });
  }

  async findAll() {
    return await this.prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
      
    });
  }

  async findLimit(){
    return await this.prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    
    });

  }

  async findOne(id: number) {
    const item = await this.prisma.gallery.findUnique({ where: { id } });

    if (!item) throw new NotFoundException('Gallery item not found');

    return item;
  }

  async update(id: number, data: UpdateGalleryDto) {
    await this.findOne(id);
    return this.prisma.gallery.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.gallery.delete({ where: { id } });
  }
}
