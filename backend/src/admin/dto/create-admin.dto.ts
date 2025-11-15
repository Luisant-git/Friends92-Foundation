import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import {Role} from '@prisma/client'


export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsOptional()
  email ?: string;

  @IsOptional()
  role ?: Role ;

  @MinLength(6)
  password: string;
}


export class LoginAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @MinLength(6)
  password: string;
}