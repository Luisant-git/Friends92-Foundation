import { IsString, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFinancialDto {
  @IsString()
  category: string;

  @IsString()
  amount: string;

  @Type(() => Number)
  @IsInt()
  percentage: number;

  @IsOptional()
  @IsString()
  year?: string;
}