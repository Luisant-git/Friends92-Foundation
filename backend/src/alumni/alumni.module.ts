import { Module } from '@nestjs/common';
import { AlumniService } from './alumni.service';
import { AlumniController } from './alumni.controller';
import { EmailService } from '../email/email.service';

@Module({
  controllers: [AlumniController],
  providers: [AlumniService, EmailService],
})
export class AlumniModule {}
