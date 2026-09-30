import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Controller('products')
export class ProductsController {
  private products: Product[] = [];

  @Get()
  @HttpCode(200) // 200 OK
  findAll(): Product[] {
    return this.products;
  }

  @Get(':id')
  @HttpCode(200) // 200 OK
  findById(@Param('id') id: number): Product {
    console.log(id);
    const product = this.products.find(
      // If you put === it will return the entire array of products
      (product) => product.id == id,
    );
    if (!product) {
      throw new NotFoundException(`Product with id:${id} not found`);
    }
    return product;
  }

  @Put(':id') 
  @HttpCode(200) // 200 OK
  update(@Param('id') id: number, @Body() updateProduct: any): Product {
    const product = this.products.find((product) => product.id == id);
    if (!product) {
      throw new NotFoundException(`Product with id:${id} not found`);
    }
    // Update the product with the new data
    Object.assign(product, updateProduct);
    return product;
  }

  @Delete(':id')
  @HttpCode(204) // 204 No Content
  delete(@Param('id') id: number): void {
    // Find the index of the product to delete
    const index = this.products.findIndex(
      (product: Product) => product.id == id,
    );
    if (index === -1) {
      throw new NotFoundException(`Product with id:${id} not found`);
    }
    // Delete the product from the array
    this.products.splice(index, 1);
    return console.log(`Product with id:${id} deleted`);
  }

  @Post()
  @HttpCode(201) // 201 Created
  /**
   * Create a new product
   * @param body - The body of the request
   * @returns The created product
   */
  create(@Body() body: { name: string; price: number }[]): Product[] {
    console.log(body);
    if (!Array.isArray(body)) {
      throw new BadRequestException('Body must be an array of products');
    }

    const created = body.map((item, index) => {
      const product: Product = {
        id: this.products.length + index + 1,
        name: item.name,
        price: item.price,
      };
      return product;
    });

    this.products.push(...created);
    return created;
  }
}
