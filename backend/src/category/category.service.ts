import {
  Injectable,
  BadRequestException,
  
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';


@Injectable()
export class CategoryService {
  private prisma = new PrismaClient();

  // Create category
  async create(dto: CreateCategoryDto) {
    const existing = await this.prisma.category.findUnique({
      where: { name: dto.name },
    });
    if (existing) throw new BadRequestException('Category already exists');

    return this.prisma.category.create({ data: { name: dto.name } });
  }

  // Get all categories
  async findAll() {
    return this.prisma.category.findMany({ include: { gallery: true } });
  }

  
  

  // Remove category
  async remove(id: number) {
    const linked = await this.prisma.gallery.findFirst({
      where: { categoryId: id },
    });
    if (linked)
      throw new BadRequestException(
        'Cannot delete category with linked gallery items',
      );

    return this.prisma.category.delete({ where: { id } });
  }
}
