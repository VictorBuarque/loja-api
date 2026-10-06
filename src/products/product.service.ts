import { ProductDto } from './dto/product.dto.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto.js';

// Injectable decorator
@Injectable()
// ProductService class that implements the ProductService interface
export class ProductService {
  // Private products array
  private products: ProductDto[] = [];
  // Private logger
  private readonly logger = new Logger(ProductService.name);
  // Generate a new id for a product
  private nextId(): number {
    return (
      this.products.reduce((max, product) => Math.max(max, product.id), 0) + 1
    );
  }

  // Find all products
  findAll(): ProductDto[] {
    this.logger.log('Finding all products');
    return this.products;
  }

  // Find a product by id
  findById(id: number): ProductDto {
    const product = this.products.find((product) => product.id == id);
    if (!product) {
      throw new NotFoundException(`Product with id:${id} not found`);
    }
    return product;
  }

  // Create a single product. The id is always generated here.
  create(product: CreateProductDto): ProductDto {
    const newProduct: ProductDto = {
      name: product.name,
      price: product.price,
      description: product.description,
      quantity: product.quantity,
      id: this.nextId(),
    };
    this.products.push(newProduct);
    this.logger.log(`Product created: ${newProduct.name}`);
    return newProduct;
  }

  // Create every product in the request array.
  createMany(products: CreateProductDto[]): ProductDto[] {
    return products.map((product) => this.create(product));
  }

  // Update a product by id
  updateById(id: number, updateProduct: UpdateProductDto): ProductDto {
    const product = this.findById(id);
    Object.assign(product, updateProduct);
    return product;
  }

  // Update a product by id partially
  updatePartialById(
    id: number,
    updateProduct: Partial<UpdateProductDto>,
  ): ProductDto {
    const product = this.findById(id);
    Object.assign(product, updateProduct);
    return product;
  }

  // Delete a product by id
  deleteById(id: number): void {
    const product = this.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with id:${id} not found`);
    }
    this.products = this.products.filter((product) => product.id !== id);
  }

  // Delete all products
  deleteAll(): void {
    this.products = [];
  }
}
