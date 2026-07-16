import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class AlumniService {
  private prisma = new PrismaClient();

  constructor(private readonly emailService: EmailService) {}

  // CREATE
  async create(data: CreateAlumniDto) {
  try {
    
    const exists = await this.prisma.alumni.findUnique({
      where: { mobile: data.mobile },
    });

    if (exists) {
      return { message: "already_registered" };
    }

    // 2. Create new alumni
    const result = await this.prisma.alumni.create({
      data,
    });

    return { message: "success", data: result };

  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}


  async filter(department?: string, year?: number) {
    return this.prisma.alumni.findMany({
      where: {
        ...(department && { department }), // match department
        ...(year && { year }), // match year
      },
      orderBy: { id: 'desc' },
    });
  }
  // FIND ALL
  async findAll() {
    return this.prisma.alumni.findMany({
      orderBy: { id: 'desc' },
    });
  }

  // FIND ONE
  async findOne(id: number) {
    return this.prisma.alumni.findUnique({
      where: { id },
    });
  }

  // UPDATE
  async update(id: number, data: UpdateAlumniDto) {
    return this.prisma.alumni.update({
      where: { id },
      data,
    });
  }

  // DELETE
  async remove(id: number) {
    await this.prisma.subscription.deleteMany({
      where: { alumniId: id },
    });
    return this.prisma.alumni.delete({
      where: { id },
    });
  }

  // Add Subscription
  async addSubscription(data: { mobile: string; planId: number; amount: number; renewalYear?: string; transactionId?: string }) {
    try {
      const alumni = await this.prisma.alumni.findUnique({ where: { mobile: data.mobile } });
      if (!alumni) {
        return { message: "alumni_not_found" };
      }
      const result = await this.prisma.subscription.create({
        data: {
          alumniId: alumni.id,
          planId: data.planId,
          amount: data.amount,
          renewalYear: data.renewalYear,
          transactionId: data.transactionId,
        },
      });

      // Send subscription receipt email if alumni has an email
      if (alumni.email) {
        this.emailService.sendSubscriptionReceiptEmail({
          id: result.id,
          name: alumni.name,
          email: alumni.email,
          phone: alumni.mobile,
          amount: data.amount,
          transactionId: data.transactionId || null,
          createdAt: result.createdAt,
        }).catch((err) => console.error('Failed to send subscription receipt email:', err));
      }

      return { message: "success", data: result };
    } catch (error) {
      console.log(error);
      return { message: "error" };
    }
  }

  // Get Subscriptions
  async getSubscriptions() {
    return this.prisma.subscription.findMany({
      include: { alumni: true, plan: true },
      orderBy: { id: 'desc' },
    });
  }

  async updateSubscriptionStatus(id: number, status: string) {
    return this.prisma.subscription.update({
      where: { id },
      data: { status },
    });
  }

  // Membership Plans
  async getMembershipPlans() {
    return this.prisma.membershipPlan.findMany({
      orderBy: { amount: 'asc' },
    });
  }

  async createMembershipPlan(data: { name: string; amount: number; description?: string; features?: string[] }) {
    return this.prisma.membershipPlan.create({ 
      data: {
        ...data,
        features: data.features || [],
      }
    });
  }

  async updateMembershipPlan(id: number, data: { name?: string; amount?: number; description?: string; features?: string[] }) {
    return this.prisma.membershipPlan.update({
      where: { id },
      data
    });
  }

  async deleteMembershipPlan(id: number) {
    return this.prisma.membershipPlan.delete({ where: { id } });
  }

  async verifyMobile(mobile: string) {
    const alumni = await this.prisma.alumni.findUnique({
      where: { mobile },
    });
    if (alumni) {
      return { exists: true, name: alumni.name };
    }
    return { exists: false };
  }
}
