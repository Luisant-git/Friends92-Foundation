import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskStatusDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        deadline: createTaskDto.deadline ? new Date(createTaskDto.deadline) : null,
      },
      include: { volunteer: true },
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      include: { volunteer: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByVolunteer(volunteerId: number) {
    return this.prisma.task.findMany({
      where: { volunteerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findCompleted() {
    return this.prisma.task.findMany({
      where: {
        status: 'COMPLETED',
      },
      include: { volunteer: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findVerified() {
    return this.prisma.task.findMany({
      where: {
        status: 'VERIFIED',
      },
      include: { volunteer: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async verifyTask(id: number) {
    return this.prisma.task.update({
      where: { id },
      data: { status: 'VERIFIED' },
      include: { volunteer: true },
    });
  }

  async updateStatus(id: number, updateTaskStatusDto: UpdateTaskStatusDto) {
    return this.prisma.task.update({
      where: { id },
      data: {
        status: updateTaskStatusDto.status as any,
        volunteerComment: updateTaskStatusDto.volunteerComment,
      },
      include: { volunteer: true },
    });
  }

  async delete(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }
}
