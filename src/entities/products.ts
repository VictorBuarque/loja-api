import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // 10 digits, 2 decimal places
  price: number;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image?: string | null;

  @Column({ type: 'int' , default:0 }) // 0 means out of stock, 1 means in stock
  quantity: number;
}