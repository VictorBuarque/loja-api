import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class ErrorResponseDto {
    @ApiProperty({ example: 400 })
    @IsInt()
    @IsNotEmpty()
    statusCode: number;

    @ApiProperty({ example: 'Bad Request' })
    @IsString()
    @IsNotEmpty()
    message: string;
    
}