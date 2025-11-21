import { IsString, IsInt,} from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  title: string;

  @IsInt()
  categoryId: number; 

  @IsString()
  imageUrl: string;
}
