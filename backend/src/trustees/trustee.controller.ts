import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrusteeService } from './trustee.service';

@Controller('trustees')
export class TrusteeController {
  constructor(private readonly trusteeService: TrusteeService) {}

  @Post()
  create(@Body() createTrusteeDto: any) {
    return this.trusteeService.create(createTrusteeDto);
  }

  @Get()
  findAll() {
    return this.trusteeService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrusteeDto: any) {
    return this.trusteeService.update(+id, updateTrusteeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trusteeService.remove(+id);
  }
}