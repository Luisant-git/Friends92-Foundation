import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {Role} from '@prisma/client'


export class CreateAdminDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email ?: string;

  @ApiPropertyOptional({ enum: Role })
  @IsOptional()
  role ?: Role ;

  @ApiProperty({ minLength: 6 })
  @MinLength(6)
  password: string;
}


export class LoginAdminDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ minLength: 6 })
  @MinLength(6)
  password: string;
}