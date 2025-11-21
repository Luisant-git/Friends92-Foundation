import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreatePlacementDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  companyDesc: string;

  @IsString()
  @IsNotEmpty()
  companyLocation: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsNotEmpty()
  jobLocation: string;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsString()
  @IsNotEmpty()
  companyContactNumber: string;

  @IsEmail()
  companyEmail: string;

  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsInt()
  experience: number;

  @IsBoolean()
  status: boolean;
}
