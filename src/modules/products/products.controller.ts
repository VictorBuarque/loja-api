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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { ProductService } from './product.service.js';
import { Products } from '../entities/products.js';
import { ProductDto } from './dto/product.dto.js';
import { ErrorResponseDto } from './dto/errror-response.dto.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ type: ProductDto, isArray: true })
  findAll(): Promise<Products[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({ type: ProductDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  findById(@Param('id') id: number): Promise<Products> {
    return this.productService.findById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOkResponse({ type: ProductDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  updatePartial(
    @Param('id') id: number,
    @Body() updateProduct: Partial<UpdateProductDto>,
  ): Promise<Products> {
    return this.productService.updatePartialById(id, updateProduct);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOkResponse({ type: ProductDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  update(
    @Param('id') id: number,
    @Body() updateProduct: UpdateProductDto,
  ): Promise<Products> {
    return this.productService.updateById(id, updateProduct);
  }

  @Post()
  @HttpCode(201)
  @ApiBody({ type: CreateProductDto, isArray: true })
  @ApiCreatedResponse({ type: ProductDto, isArray: true })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
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

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  async delete(@Param('id') id: number): Promise<void> {
    await this.productService.deleteById(id);
  }
}
