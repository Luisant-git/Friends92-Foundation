import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVolunteerDto } from './volunteer.dto';
import { EmailService } from '../email/email.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class VolunteerService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async create(createVolunteerDto: CreateVolunteerDto) {
    const existing = await this.prisma.volunteer.findUnique({
      where: { email: createVolunteerDto.email },
    });

    if (existing) {
      throw new Error('Email already exists');
    }

    return this.prisma.volunteer.create({
      data: {
        ...createVolunteerDto,
        password: '',
        isActive: false,
      },
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

  async approveVolunteer(id: number) {
    const volunteer = await this.prisma.volunteer.findUnique({ where: { id } });
    if (!volunteer) throw new Error('Volunteer not found');

    const password = volunteer.email.split('@')[0];
    const hashedPassword = await bcrypt.hash(password, 10);

    const updated = await this.prisma.volunteer.update({
      where: { id },
      data: { password: hashedPassword },
    });

    await this.emailService.sendVolunteerSelectionEmail(
      volunteer.email,
      password,
      volunteer.name,
    );

    return updated;
  }

  async activateVolunteer(id: number) {
    const volunteer = await this.prisma.volunteer.findUnique({ where: { id } });
    if (!volunteer) throw new Error('Volunteer not found');

    const updated = await this.prisma.volunteer.update({
      where: { id },
      data: { isActive: true },
    });

    const password = volunteer.email.split('@')[0];
    await this.emailService.sendVolunteerActivationEmail(
      volunteer.email,
      password,
      volunteer.name,
    );

    return updated;
  }

  async login(email: string, password: string) {
    const volunteer = await this.prisma.volunteer.findUnique({ where: { email } });
    if (!volunteer || !volunteer.isActive) {
      throw new Error('Invalid credentials or account not active');
    }

    const isValid = await bcrypt.compare(password, volunteer.password);
    if (!isValid) throw new Error('Invalid credentials');

    const { password: _, ...volunteerData } = volunteer;
    return volunteerData;
  }

  async toggleActive(id: number) {
    const volunteer = await this.prisma.volunteer.findUnique({ where: { id } });
    if (!volunteer) throw new Error('Volunteer not found');

    return this.prisma.volunteer.update({
      where: { id },
      data: { isActive: !volunteer.isActive },
    });
  }

  async resetPassword(email: string) {
    const volunteer = await this.prisma.volunteer.findUnique({ where: { email } });
    if (!volunteer || !volunteer.password) {
      throw new Error('Volunteer not found or not approved');
    }

    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/volunteer/reset-password/${resetToken}`;

    await this.emailService.sendPasswordResetEmail(email, volunteer.name, resetUrl);

    return { message: 'Password reset link sent to your email.', token: resetToken, volunteerId: volunteer.id };
  }

  async updatePassword(token: string, volunteerId: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    return this.prisma.volunteer.update({
      where: { id: volunteerId },
      data: { password: hashedPassword },
    });
  }
}
