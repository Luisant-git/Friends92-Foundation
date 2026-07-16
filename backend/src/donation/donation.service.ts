import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class DonationService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async create(createDonationDto: CreateDonationDto) {
    const donation = await this.prisma.donation.create({
      data: createDonationDto,
    });

    if (donation.email) {
      this.emailService.sendDonationReceiptEmail(donation).catch((err) => {
        console.error('Failed to send donation receipt email:', err);
      });
    }

    return donation;
  }

  async findAll() {
    return this.prisma.donation.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}

