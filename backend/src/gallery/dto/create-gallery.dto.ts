import { IsString, IsInt, IsOptional} from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  title: string;

  @IsInt()
  categoryId: number; 

  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsString()
  videoLink?: string;
}
