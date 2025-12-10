import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto, UpdateEventDto } from './dto/events.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        ...createEventDto,
        eventDate: new Date(createEventDto.eventDate),
        type: createEventDto.type === 'event' ? 'EVENT' : 'NEWS',
      },
    });
  }

  async findAll() {
    return this.prisma.event.findMany({
      orderBy: {
        eventDate: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const updateData: any = { ...updateEventDto };
    
    if (updateEventDto.eventDate) {
      updateData.eventDate = new Date(updateEventDto.eventDate);
    }
    
    if (updateEventDto.type) {
      updateData.type = updateEventDto.type === 'event' ? 'EVENT' : 'NEWS';
    }
    
    return this.prisma.event.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}