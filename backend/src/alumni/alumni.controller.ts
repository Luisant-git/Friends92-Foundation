import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
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

  @Post('subscription')
  addSubscription(@Body() data: { mobile: string; planId: number; amount: number; renewalYear?: string; transactionId?: string }) {
    return this.alumniService.addSubscription(data);
  }

  @Get('subscriptions/all')
  getSubscriptions() {
    return this.alumniService.getSubscriptions();
  }

  @Patch('subscription/:id/status')
  updateSubscriptionStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.alumniService.updateSubscriptionStatus(Number(id), status);
  }

  @Get('membership-plans')
  getMembershipPlans() {
    return this.alumniService.getMembershipPlans();
  }

  @Post('membership-plan')
  createMembershipPlan(@Body() data: { name: string; amount: number; description?: string; features?: string[] }) {
    return this.alumniService.createMembershipPlan(data);
  }

  @Put('membership-plan/:id')
  updateMembershipPlan(
    @Param('id') id: string,
    @Body() data: { name?: string; amount?: number; description?: string; features?: string[] }
  ) {
    return this.alumniService.updateMembershipPlan(+id, data);
  }

  @Delete('membership-plan/:id')
  deleteMembershipPlan(@Param('id') id: string) {
    return this.alumniService.deleteMembershipPlan(Number(id));
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
