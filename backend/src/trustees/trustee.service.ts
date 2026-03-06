import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TrusteeService {
  private prisma = new PrismaClient();

  async create(createTrusteeDto: any) {
    return this.prisma.trustee.create({
      data: createTrusteeDto,
    });
  }

  async findAll() {
    return this.prisma.trustee.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  async update(id: number, updateTrusteeDto: any) {
    return this.prisma.trustee.update({
      where: { id },
      data: updateTrusteeDto,
    });
  }

  async remove(id: number) {
    return this.prisma.trustee.delete({
      where: { id },
    });
  }
}