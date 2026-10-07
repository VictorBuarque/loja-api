import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller.js';
import { ProductService } from './product.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../entities/products.js';

// Module decorator
@Module({
  // Controllers
  controllers: [ProductsController],
  // Providers
  providers: [ProductService],
  // Entities
  imports: [TypeOrmModule.forFeature([Products])], //If don't put this, the entities will not be loaded into the database
})
export class ProductsModule {}
