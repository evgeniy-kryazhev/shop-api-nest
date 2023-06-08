import { Product } from './product';

export interface IProductService {
  findAll(): Promise<Product[]>;
  create(product: Product): Promise<Product>;
}
