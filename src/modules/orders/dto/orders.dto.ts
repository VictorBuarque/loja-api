import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { OrderStatus } from "../../../entities/orders/orders.js";
import { OrderItemDto } from "./order-item.dto.js";

export class OrdersDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    @IsNotEmpty()
    id: number;

    @ApiProperty({ example: '1234567890' })
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ example: 100.00 })
    @IsNumber()
    @IsNotEmpty()
    total: number;

    @ApiProperty({ example: 'pending' })
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus;

    @ApiProperty({ example: [{ productId: 1, quantity: 1 }] })
    @IsArray()
    @IsNotEmpty()
    items: OrderItemDto[];
}