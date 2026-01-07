import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  private prisma = new PrismaClient();

  create(data: CreateBlogDto) {
    return this.prisma.blog.create({ data });
  }

  findAll() {
    return this.prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: number) {
    return this.prisma.blog.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateBlogDto) {
    return this.prisma.blog.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.blog.delete({ where: { id } });
  }
}
