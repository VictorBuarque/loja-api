import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class OrderItemDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 100.0 })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
