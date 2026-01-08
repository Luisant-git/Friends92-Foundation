import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationService {
  constructor(private prisma: PrismaService) {}

  async create(createDonationDto: CreateDonationDto) {
    return this.prisma.donation.create({
      data: createDonationDto,
    });
  }

  async findAll() {
    return this.prisma.donation.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
