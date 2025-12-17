import { IsString, IsInt, IsOptional, IsBoolean} from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  title: string;

  @IsInt()
  categoryId: number; 

  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsBoolean()
  isVideo?: boolean;
}
