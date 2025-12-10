import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsIn(['SKILL_DEVELOPMENT', 'PERSONALITY_DEVELOPMENT'])
  type: 'SKILL_DEVELOPMENT' | 'PERSONALITY_DEVELOPMENT';
}

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsIn(['SKILL_DEVELOPMENT', 'PERSONALITY_DEVELOPMENT'])
  type?: 'SKILL_DEVELOPMENT' | 'PERSONALITY_DEVELOPMENT';
}