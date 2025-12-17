import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVolunteerDto } from './volunteer.dto';

@Injectable()
export class VolunteerService {
  constructor(private prisma: PrismaService) {}

  async create(createVolunteerDto: CreateVolunteerDto) {
    return this.prisma.volunteer.create({
      data: createVolunteerDto,
    });
  }

  async findAll() {
    return this.prisma.volunteer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.volunteer.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prisma.volunteer.delete({
      where: { id },
    });
  }
}
