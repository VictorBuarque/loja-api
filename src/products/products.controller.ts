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

@Controller('products')
export class ProductsController {
  // Inject the ProductService
  constructor(private readonly productService: ProductService) {}

  // Controller methods
  // Find all products
  @Get()
  @HttpCode(200) // 200 OK
  findAll(): ProductDto[] {
    return this.productService.findAll();
  }

  // Find a product by id
  @Get(':id')
  @HttpCode(200) // 200 OK
  findById(@Param('id') id: number): ProductDto {
    return this.productService.findById(id);
  }

  // Update a product by id partially
  @Patch(':id')
  @HttpCode(200) // 200 OK
  updatePartial(
    @Param('id') id: number,
    @Body() updateProduct: Partial<UpdateProductDto>,
  ): ProductDto {
    return this.productService.updatePartialById(id, updateProduct);
  }

  // Update a product by id
  @Put(':id')
  @HttpCode(200) // 200 OK
  update(
    @Param('id') id: number,
    @Body() updateProduct: UpdateProductDto,
  ): ProductDto {
    return this.productService.updateById(id, updateProduct);
  }

  // Create a new product
  @Post()
  @HttpCode(201) // 201 Created
  /**
   * Create a new product
   * @param body - The body of the request
   * @returns The created product
   */
  create(
    @Body(
      new ParseArrayPipe({
        items: CreateProductDto,
        whitelist: true,
      }),
    )
    body: CreateProductDto[],
  ): ProductDto[] {
    return this.productService.createMany(body);
  }

  // Delete a product by id
  @Delete(':id')
  @HttpCode(204) // 204 No Content
  delete(@Param('id') id: number): void {
    // Find the index of the product to delete
    return this.productService.deleteById(id);
  }
}
