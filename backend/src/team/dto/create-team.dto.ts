import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}