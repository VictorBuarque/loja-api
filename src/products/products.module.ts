import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller.js';
import { ProductService } from './product.service.js';

// Module decorator
@Module({
  // Controllers
  controllers: [ProductsController],
  // Providers
  providers: [ProductService],
})
export class ProductsModule {}
