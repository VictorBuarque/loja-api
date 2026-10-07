import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { Orders } from '../../entities/orders/orders.js';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    async createOrder(@Body() order: Orders): Promise<Orders> {
        return this.ordersService.createOrder(order);
    }
}
