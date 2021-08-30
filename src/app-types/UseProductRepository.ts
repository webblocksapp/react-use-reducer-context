import { Product } from '../interfaces';
import { ProductReducerState } from './ProductReducerState';

export type UseProductRepository = {
  productRepository: {
    findAll: () => Promise<void>;
    findAllWithDiscount: () => Promise<void>;
    create: (product: Product) => Promise<void>;
    state: ProductReducerState;
  };
};
