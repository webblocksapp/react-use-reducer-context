import { Product } from '../interfaces';
import { ProductReducerState } from './ProductReducerState';

export type UseProductRepository = {
  productRepository: {
    fetchAll: () => Promise<void>;
    fetchAllWithDiscount: () => Promise<void>;
    add: (product: Product) => Promise<void>;
    state: ProductReducerState;
  };
};
