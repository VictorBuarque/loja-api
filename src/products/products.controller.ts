import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { ProductDto } from './dto/product.dto.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { ProductService } from './product.service.js';
import { Products } from '../entities/products.js';

@Controller('products')
export class ProductsController {
  // Inject the ProductService
  constructor(private readonly productService: ProductService) {}

  // Controller methods
  // Find all products
  @Get()
  @HttpCode(200) // 200 OK
  findAll(): Promise<Products[]> {
    return this.productService.findAll();
  }

  // Find a product by id
  @Get(':id')
  @HttpCode(200) // 200 OK
  findById(@Param('id') id: number): Promise<Products> {
    return this.productService.findById(id);
  }

  // Update a product by id partially
  @Patch(':id')
  @HttpCode(200) // 200 OK
  updatePartial(
    @Param('id') id: number,
    @Body() updateProduct: Partial<UpdateProductDto>,
  ): Promise<Products> {
    return this.productService.updatePartialById(id, updateProduct);
  }

  // Update a product by id
  @Put(':id')
  @HttpCode(200) // 200 OK
  update(
    @Param('id') id: number,
    @Body() updateProduct: UpdateProductDto,
  ): Promise<Products> {
    return this.productService.updateById(id, updateProduct);
  }

  /**
   * Create products from an array.
   * Each item is saved by the service, which assigns the id.
   */
  @Post()
  @HttpCode(201) // 201 Created
  create(
    @Body(
      new ParseArrayPipe({
        items: CreateProductDto,
        whitelist: true,
      }),
    )
    body: CreateProductDto[],
  ): Promise<Products[]> {
    return this.productService.createMany(body);
  }

  // Delete a product by id
  @Delete(':id')
  @HttpCode(204) // 204 No Content
  async delete(@Param('id') id: number): Promise<void> {
    // Find the index of the product to delete
    await this.productService.deleteById(id);
  }
}
