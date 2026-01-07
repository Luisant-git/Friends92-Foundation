import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlumniDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsNotEmpty()
  @IsString()
  department: string;

  @IsInt()
  year: number;

  @IsNotEmpty()
  @IsString()
  mobile: string;

  @IsOptional()
  @IsString()
  mobile2?: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  profession?: string;

  @IsOptional()
  @IsString()
  serviceArea?: string;

  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @IsOptional()
  @IsString()
  willingToDonateBlood?: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  servicesCanProvide?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsOptional()
  @IsString()
  employeeDepartment?: string;

  @IsOptional()
  @IsString()
  employeePlace?: string;

  @IsOptional()
  @IsString()
  businessName?: string;

  @IsOptional()
  @IsString()
  natureOfBusiness?: string;

  @IsOptional()
  @IsString()
  businessPlace?: string;

  @IsOptional()
  @IsString()
  businessAddress?: string;

  @IsOptional()
  @IsString()
  permanentAddress?: string;

  @IsOptional()
  @IsString()
  willingToProvideServices?: string;
}
