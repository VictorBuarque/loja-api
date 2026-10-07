import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { OrderStatus } from '../../../entities/orders/orders.js';
import { OrderItemDto } from './order-item.dto.js';
import { Type } from 'class-transformer';

export class OrdersDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: '1234567890' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 100.0 })
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @ApiProperty({ example: 'pending' })
  @IsEnum(OrderStatus) // Validate the status to be a valid order status
  @IsNotEmpty()
  status: OrderStatus;

  @ApiProperty({ example: [{ productId: 1, quantity: 1 }] })
  @IsArray()
  @ValidateNested({ each: true }) // Validate each item in the array
  @ArrayNotEmpty()
  @Type(() => OrderItemDto) // Transform the array of OrderItemDto to an array of OrderItemDto
  items: OrderItemDto[];
}
