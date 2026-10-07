import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersDto } from './dto/orders.dto.js';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '../../common/dto/error-response.dto.js';
import { Orders } from '../../entities/orders/orders.js';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ type: OrdersDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  async createOrder(
    @Body() order: OrdersDto,
    @Req() req: Request & { user: { id: number } },
  ): Promise<Orders> {
    return this.ordersService.createOrder(order, req.user.id);
  }
}
