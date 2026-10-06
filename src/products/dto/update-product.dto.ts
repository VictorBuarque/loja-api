import {
  IsOptional,
  IsString,
  IsNumber,
  MinLength,
  Min,
  MaxLength,
  IsInt,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01, { message: 'Price must be greater than 0.01' })
  price?: number;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters' })
  @MaxLength(1000, { message: 'Description must be less than 1000 characters' })
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0, { message: 'Quantity must be greater than 0' })
  quantity?: number;
}
