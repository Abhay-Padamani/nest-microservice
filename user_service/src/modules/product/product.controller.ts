import { Controller, Get } from '@nestjs/common';
import { createProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @EventPattern('create product')
  async productCreated(
    @Payload() product: createProductDto,
    @Ctx() context: RmqContext,
  ) {
    return this.productService.createProduct(product);
  }
  @EventPattern('delete product')
  async productDeleted(
    @Payload() productId: string,
    @Ctx() context: RmqContext,
  ) {
    return this.productService.deleteProduct(productId);
  }

  @EventPattern('update product')
  async productUpdated(
    @Payload() product: { id: number; productPayload: createProductDto },
    @Ctx() context: RmqContext,
  ) {
    return this.productService.updateProduct(
      product.id,
      product.productPayload,
    );
  }

  @Get()
  getAllProduct() {
    return this.productService.getAllProducts();
  }
}
