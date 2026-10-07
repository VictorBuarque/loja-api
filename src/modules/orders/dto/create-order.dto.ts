import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ example: 100.00 })
    @IsNumber()
    @IsNotEmpty()
    total: number;
}