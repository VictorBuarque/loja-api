import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ProductDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'Chapéu', maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 600, minimum: 0.01 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0.01, { message: 'Price must be greater than 0.01' })
  price: number;

  @ApiProperty({
    example: 'Chapéu de feltro azul',
    minLength: 10,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Description must be at least 10 characters' })
  @MaxLength(255, { message: 'Description must be less than 255 characters' })
  description: string;

  @ApiProperty({ example: 10, minimum: 0 })
  @IsInt()
  @IsNotEmpty()
  @Min(0, { message: 'Quantity must be 0 or greater' })
  quantity: number;

  @ApiPropertyOptional({
    example: 'https://exemplo.com/chapeu.png',
    nullable: true,
    maxLength: 255,
  })
  @IsOptional()
  @IsUrl({}, { message: 'Image must be a valid URL' })
  @MaxLength(255, { message: 'Image must be less than 255 characters' })
  image?: string | null;
}
