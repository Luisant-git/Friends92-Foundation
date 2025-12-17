import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateTrustDto {
  @IsString()
  name: string;

  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}