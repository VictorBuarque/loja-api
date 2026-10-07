import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";
import { OrdersDto } from "./orders.dto.js";

export class OrderItemDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    @IsNotEmpty()
    id: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsNotEmpty()
    orderId: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsNotEmpty()
    productId: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({ example: 100.00 })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsNotEmpty()
    order: OrdersDto;
  
}       