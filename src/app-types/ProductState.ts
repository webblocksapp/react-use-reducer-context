import { Product } from '../interfaces';

export type ProductState = {
  products: Product[];
  findingAll: boolean;
  findingAllWithDiscount: boolean;
  adding: boolean;
  updating: boolean;
  removing: boolean;
  error: string;
};
