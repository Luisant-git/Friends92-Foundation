import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/create-admin.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  private prisma = new PrismaClient();

  async create(createAdminDto: CreateAdminDto) {
    const { name, email, password } = createAdminDto;

    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email },
    });
    if (existingAdmin) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await this.prisma.admin.create({
      data: { name, email, password: hashedPassword },
    });

    return {
      message: 'Admin registered successfully',
      admin: newAdmin,
    };
  }

  async login(loginAdminDto: LoginAdminDto) {
    const { name, password } = loginAdminDto;

    const admin = await this.prisma.admin.findUnique({ where: { name } });
    if (!admin) throw new UnauthorizedException('Invalid name or password');

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) throw new UnauthorizedException('Invalid name or password');

    return { message: 'Login successful', admin: admin };
  }
}
