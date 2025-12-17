import { Module } from '@nestjs/common';
import { VolunteerController } from './volunteer.controller';
import { VolunteerService } from './volunteer.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [VolunteerController],
  providers: [VolunteerService, PrismaService],
})
export class VolunteerModule {}
