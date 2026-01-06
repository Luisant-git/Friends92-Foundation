import { IsString, IsOptional } from 'class-validator';

export class CreateReportDto {
  @IsString()
  year: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;
}