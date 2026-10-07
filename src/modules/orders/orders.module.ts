import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../../entities/orders/orders.js';
import { OrderItem } from '../../entities/orders/order-item.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderItem])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
