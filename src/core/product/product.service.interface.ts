import { Product } from './product';

export interface FindAllArgs {
  skip?: number;
  take?: number;

  filter?: string;
}

export interface IProductService {
  hasProduct(id: string): Promise<boolean>;

  findAll(args: Partial<FindAllArgs>): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  create(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
  update(id: string, product: Omit<Product, 'id'>): Promise<void>;

  getCount(args?: Omit<FindAllArgs, 'skip' | 'take'>): Promise<number>;
}
