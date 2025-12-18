import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { CreateVolunteerDto } from './volunteer.dto';

@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Post()
  async create(@Body() createVolunteerDto: CreateVolunteerDto) {
    return this.volunteerService.create(createVolunteerDto);
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
}
