import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TrustService } from './trust.service';
import { CreateTrustDto } from './dto/create-trust.dto';
import { UpdateTrustDto } from './dto/update-trust.dto';

@Controller('trust')
export class TrustController {
  constructor(private readonly trustService: TrustService) {}

  @Post()
  create(@Body() createTrustDto: CreateTrustDto) {
    return this.trustService.create(createTrustDto);
  }

  @Get()
  findAll() {
    return this.trustService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.trustService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTrustDto: UpdateTrustDto,
  ) {
    return this.trustService.update(id, updateTrustDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.trustService.remove(id);
  }
}