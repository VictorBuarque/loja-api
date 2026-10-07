import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Orders } from "./orders.js";

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @Column()
  productId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Orders, (order) => order.items, { onDelete: 'CASCADE' })
  order: Orders;
}