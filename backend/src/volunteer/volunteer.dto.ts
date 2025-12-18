import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateVolunteerDto {
  @IsString()
  name: string;

  @IsString()
  service: string;

  @IsString()
  mobile1: string;

  @IsOptional()
  @IsString()
  mobile2?: string;

  @IsEmail()
  email: string;

  @IsString()
  profession: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsOptional()
  @IsString()
  companyDepartment?: string;

  @IsOptional()
  @IsString()
  companyPlace?: string;

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

  @IsString()
  permanentAddress: string;

  @IsString()
  servicesOffered: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}
