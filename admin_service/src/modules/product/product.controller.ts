import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { createProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('new')
  createProduct(@Body('product') product: createProductDto) {
    return this.productService.createProduct(product);
  }

  @Patch('update/:id')
  updateProduct(
    @Param('id') id: string,
    @Body('product') product: Partial<createProductDto>,
  ) {
    const intId = parseInt(id);
    return this.productService.updateProduct(intId, product);
  }

  @Delete('delete/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  @Get()
  getAllProduct() {
    return this.productService.getAllProducts();
  }
}
