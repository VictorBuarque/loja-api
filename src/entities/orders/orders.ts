import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItem } from "./order-item.entity.js";

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

@Entity('orders')
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 255,  })
  userId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // One to many relationship with OrderItem with cascade and eager options
  @OneToMany(() => OrderItem, (item) => item.orderId, {cascade: true, eager: true})
  items: OrderItem[];
}