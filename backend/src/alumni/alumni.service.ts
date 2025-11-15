import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';

@Injectable()
export class AlumniService {
  private prisma = new PrismaClient();

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
    return this.prisma.alumni.delete({
      where: { id },
    });
  }
}
