import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from '../../entities/orders/orders.js';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
  ) {}

  async createOrder(order: Orders): Promise<Orders> {
    return this.ordersRepository.save(order);
  }

  async getOrderById(id: string): Promise<Orders> {
    return this.ordersRepository.findOne({ where: { id: id as unknown as number } }) as Promise<Orders>;
  }

  async updateOrder(id: string, order: Orders): Promise<Orders> {
    return this.ordersRepository.update({id: id as unknown as number }, order) as unknown as Orders;
  }

  async deleteOrder(id: string): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
