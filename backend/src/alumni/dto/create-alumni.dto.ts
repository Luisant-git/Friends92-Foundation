import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAlumniDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  mobile: string;

  @IsNotEmpty()
  @IsString()
  department: string;
}
