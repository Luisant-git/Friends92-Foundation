import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateBannerDto {
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @IsNumber()
  adminId:number;
}
