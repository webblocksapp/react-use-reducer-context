import { Product } from '../interfaces';

export type ProductReducerState = {
  products: Product[];
  loading: boolean;
  error: string;
};
