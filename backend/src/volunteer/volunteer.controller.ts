import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { CreateVolunteerDto } from './volunteer.dto';

@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Post()
  async create(@Body() createVolunteerDto: CreateVolunteerDto) {
    try {
      return await this.volunteerService.create(createVolunteerDto);
    } catch (error) {
      if (error.message === 'Email already exists') {
        throw new HttpException(
          { statusCode: 400, message: 'Email already exists' },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        { statusCode: 500, message: 'Internal server error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    return this.volunteerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.volunteerService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.volunteerService.remove(id);
  }

  @Patch(':id/approve')
  async approve(@Param('id', ParseIntPipe) id: number) {
    return this.volunteerService.approveVolunteer(id);
  }

  @Patch(':id/activate')
  async activate(@Param('id', ParseIntPipe) id: number) {
    return this.volunteerService.activateVolunteer(id);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.volunteerService.login(body.email, body.password);
  }

  @Patch(':id/toggle-active')
  async toggleActive(@Param('id', ParseIntPipe) id: number) {
    return this.volunteerService.toggleActive(id);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { email: string }) {
    return this.volunteerService.resetPassword(body.email);
  }

  @Post('update-password')
  async updatePassword(@Body() body: { token: string; volunteerId: number; newPassword: string }) {
    return this.volunteerService.updatePassword(body.token, body.volunteerId, body.newPassword);
  }
}
