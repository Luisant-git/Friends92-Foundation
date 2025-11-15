import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AlumniService } from './alumni.service';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';

@Controller('alumni')
export class AlumniController {
  constructor(private readonly alumniService: AlumniService) {}

  @Post()
  create(@Body() dto: CreateAlumniDto) {
    return this.alumniService.create(dto);
  }

  @Get()
  findAll() {
    return this.alumniService.findAll();
  }
  @Get('filter')
  filter(
    @Query('department') department?: string,
    @Query('passedOutYear') year?: string,
  ) {
    return this.alumniService.filter(
      department,
      year ? Number(year) : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alumniService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAlumniDto) {
    return this.alumniService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alumniService.remove(Number(id));
  }
}
