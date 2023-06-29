import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { createProductDto } from './dtos/create-product.dto';
import { Product } from '../../entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createProduct(product: createProductDto) {
    let newProduct = this.productRepository.create(product);
    newProduct = await this.productRepository.save(newProduct);
    return newProduct;
  }

  async deleteProduct(id: string) {
    await this.productRepository.delete(id);
    return { status: true, message: 'successfully deleted' };
  }

  async updateProduct(id: number, productPayload: createProductDto) {
    const product = await this.productRepository.findOne({ where: { id: id } });
    Object.assign(product, productPayload);
    await this.productRepository.save(product);
    return product;
  }

  async getAllProducts() {
    return await this.productRepository.find({});
  }
}
