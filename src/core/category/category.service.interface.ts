import { Category } from './category';

export interface ICategoryService {
  HasCategory(id: string): Promise<boolean>;
  create(name: string): Promise<Category>;
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category>;
}
