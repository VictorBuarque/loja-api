import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class UpdateOrderDto {
    @ApiProperty({ example: 1})
    @IsInt()
    @IsNotEmpty()
    id: number;
}