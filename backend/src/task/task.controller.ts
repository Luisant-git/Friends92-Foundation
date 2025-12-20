import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskStatusDto } from './task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll() {
    return this.taskService.findAll();
  }

  @Get('completed')
  async findCompleted() {
    return this.taskService.findCompleted();
  }

  @Get('verified')
  async findVerified() {
    return this.taskService.findVerified();
  }

  @Get('volunteer/:volunteerId')
  async findByVolunteer(@Param('volunteerId', ParseIntPipe) volunteerId: number) {
    return this.taskService.findByVolunteer(volunteerId);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.taskService.updateStatus(id, updateTaskStatusDto);
  }

  @Patch(':id/verify')
  async verifyTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.verifyTask(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.delete(id);
  }
}
