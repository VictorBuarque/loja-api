import {
  IsString,
  IsNumber,
  Min,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsInt,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { Url } from 'url';

export class CreateProductDto {
  // Name validator
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01, { message: 'Price must be greater than 0.01' })
  price: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Description must be at least 10 characters' })
  @MaxLength(1000, { message: 'Description must be less than 1000 characters' })
  description: string;

  @IsInt()
  @IsNotEmpty()
  @Min(0, { message: 'Quantity must be greater than 0' })
  quantity: number;

  @IsOptional()
  @IsUrl({}, { message: 'Image must be a valid URL' })
  @MaxLength(255, { message: 'Image must be less than 255 characters' })
  image?: string | null;
}
