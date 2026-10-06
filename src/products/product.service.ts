import { ProductDto } from './dto/product.dto.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Products } from '../entities/products.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Injectable decorator
@Injectable()
// ProductService class that implements the ProductService interface
export class ProductService {
  // Private logger
  private readonly logger = new Logger(ProductService.name);

  // Constructor to inject the product repository
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>, // Inject the product repository to use the product repository
  ) { }

  // Find all products
  async findAll(): Promise<Products[]> {
    this.logger.log('Finding all products');
    return await this.productRepository.find();
  }

  // Find a product by id.
  async findById(id: number): Promise<Products> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id:${id} not found`);
    }
    return product;
  }

  // Create a single product. The id is always generated here.
  async create(product: CreateProductDto): Promise<Products> {
    const newProduct = new Products();
    newProduct.name = product.name;
    newProduct.price = product.price;
    newProduct.description = product.description;
    newProduct.quantity = product.quantity;

    if (newProduct.name === '' || newProduct.price === 0 || newProduct.description === '' || newProduct.quantity === 0) {
      throw new BadRequestException('Name, price, description, and quantity are required');
    }
    return await this.productRepository.save(newProduct);
  }

  // Create every product in the request array.
  async createMany(products: CreateProductDto[]): Promise<Products[]> {
    return this.productRepository.save(products);
  }

  // Update a product by id
  async updateById(id: number, updateProduct: UpdateProductDto): Promise<Products> {
    const product = await this.findById(id);
    Object.assign(product, updateProduct);
    return await this.productRepository.save(product);
  }

  // Update a product by id partially
  async updatePartialById(
    id: number,
    updateProduct: Partial<UpdateProductDto>,
  ): Promise<Products> {
    const product = await this.findById(id);
    Object.assign(product, updateProduct);
    return await this.productRepository.save(product);
  }

  // Delete a product by id
  async deleteById(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  // Delete all products
  async deleteAll(): Promise<void> {
    await this.productRepository.delete({});
    this.productRepository.delete({});
  }
}
