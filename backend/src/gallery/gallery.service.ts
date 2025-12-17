import {
  Injectable,
  NotFoundException,

} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Injectable()
export class GalleryService {
  private prisma = new PrismaClient();

  // Create
  async create(data: CreateGalleryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) throw new NotFoundException('Category not found');

    return this.prisma.gallery.create({
      data: {
        title: data.title,
        imageUrl: data.imageUrl,
        categoryId: data.categoryId,
        isVideo: data.isVideo || false,
      },
    });
  }

  // Get all
  async findAll() {
    return this.prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    });
  }

  // Get limit 10
  async findLimit() {
    return this.prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { category: true },
    });
  }

  // Get by ID
  async findOne(id: number) {
    const item = await this.prisma.gallery.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!item) throw new NotFoundException('Gallery item not found');
    return item;
  }

  // Update
  async update(id: number, data: UpdateGalleryDto) {
   
    const item = await this.findOne(id); 

  
    if (data.categoryId && data.categoryId !== item.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: data.categoryId },
      });
      if (!category) throw new NotFoundException('Category not found');
    }

   
    const updated = await this.prisma.gallery.update({
      where: { id },
      data,
      include: { category: true }, 
    });

    return updated;
  }

  // Delete
  async remove(id: number) {
    await this.findOne(id); 
    return this.prisma.gallery.delete({ where: { id } });
  }
}
