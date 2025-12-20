import { IsString, IsInt, IsEnum, IsOptional } from 'class-validator';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  VERIFIED = 'VERIFIED',
}

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  volunteerId: number;

  @IsOptional()
  @IsString()
  deadline?: string;

  @IsOptional()
  @IsString()
  taskType?: string;
}

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsString()
  volunteerComment?: string;

  @IsOptional()
  imageUrls?: string[];

  @IsOptional()
  @IsString()
  impactTitle?: string;

  @IsOptional()
  @IsString()
  impactDescription?: string;

  @IsOptional()
  @IsString()
  impactField?: string;
}
