import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from '../../entities/orders/orders.js';
import { Repository } from 'typeorm';
import { OrdersDto } from './dto/orders.dto.js';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
  ) {}

  async createOrder(dto: OrdersDto, userId: number | null): Promise<Orders> {
    const order = this.ordersRepository.create({
      ...dto,
      userId,
    });
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    if (order.items.length === 0) {
      throw new BadRequestException('Order items are required');
    }
    if (order.items.some((item) => item.quantity <= 0)) {
      throw new BadRequestException('Quantity must be greater than 0');
    }
    return this.ordersRepository.save(order);
  }

  async getOrderById(id: number | null): Promise<Orders> {
    return this.ordersRepository.findOne({
      where: { id: id as unknown as number },
    }) as Promise<Orders>;
  }

  async updateOrder(id: number | null, order: Orders): Promise<Orders> {
    return this.ordersRepository.update(
      { id: id as unknown as number },
      order,
    ) as unknown as Orders;
  }

  async deleteOrder(id: number | null): Promise<void> {
    await this.ordersRepository.delete(id as unknown as number);
  }
}
