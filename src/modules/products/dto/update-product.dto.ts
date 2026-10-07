import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Chapéu', minLength: 3, maxLength: 255 })
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @ApiPropertyOptional({ example: 600, minimum: 0.01 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01, { message: 'Price must be greater than 0.01' })
  price?: number;

  @ApiPropertyOptional({
    example: 'Chapéu de feltro azul',
    minLength: 10,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters' })
  @MaxLength(255, { message: 'Description must be less than 255 characters' })
  description?: string;

  @ApiPropertyOptional({ example: 10, minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0, { message: 'Quantity must be 0 or greater' })
  quantity?: number;

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
