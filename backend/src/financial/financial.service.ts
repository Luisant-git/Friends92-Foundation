import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFinancialDto } from './dto/create-financial.dto';
import { UpdateFinancialDto } from './dto/update-financial.dto';

@Injectable()
export class FinancialService {
  constructor(private prisma: PrismaService) {}

  async create(createFinancialDto: CreateFinancialDto) {
    return this.prisma.financial.create({
      data: createFinancialDto,
    });
  }

  async findAll() {
    return this.prisma.financial.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.financial.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateFinancialDto: UpdateFinancialDto) {
    return this.prisma.financial.update({
      where: { id },
      data: updateFinancialDto,
    });
  }

  async remove(id: number) {
    return this.prisma.financial.delete({
      where: { id },
    });
  }
}