import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MAX_TAKE } from 'src/core/constants';
import { Product } from 'src/core/product/product';
import {
  FindAllArgs,
  IProductService,
} from 'src/core/product/product.service.interface';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async hasProduct(id: string): Promise<boolean> {
    const product = await this.productRepository.findOne({ where: { id } });
    return product != null;
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete({ id: id });
  }

  create(product: Product): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  async findAll(args?: Partial<FindAllArgs>): Promise<Product[]> {
    const products = await this.productRepository.find({
      order: { name: 'ASC' },
      skip: args?.skip || 0,
      take: args?.take || MAX_TAKE,
      where:
        args != null
          ? {
              name: args?.filter ? Like(`%${args?.filter}%`) : null,
            }
          : {},
    });
    return products;
  }

  findById(id: string): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  async update(id: string, product: Omit<Product, 'id'>): Promise<void> {
    const entity = await this.productRepository.findOneBy({ id });
    await this.productRepository.update(entity, product);
  }

  async getCount(args?: Omit<FindAllArgs, 'skip' | 'take'>): Promise<number> {
    const count = await this.productRepository.count({
      where:
        args != null
          ? {
              name: args?.filter ? Like(`%${args?.filter}%`) : null,
            }
          : {},
    });
    return count;
  }
}
