import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Validation messages, or a single error message',
    oneOf: [
      { type: 'string', example: 'Product with id:1 not found' },
      {
        type: 'array',
        items: { type: 'string' },
        example: ['Description must be at least 10 characters'],
      },
    ],
  })
  message: string | string[];

  @ApiProperty({
    description: 'HTTP error name',
    example: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode: number;
}
