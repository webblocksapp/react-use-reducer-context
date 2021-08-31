import { Product } from '../interfaces';
import { ProductState } from './ProductState';

export type UseProductRepository = {
  productRepository: {
    findAll: () => Promise<void>;
    findAllWithDiscount: () => Promise<void>;
    create: (product: Product) => Promise<void>;
    update: (id: number, product: Product) => Promise<void>;
    remove: (id: number) => Promise<void>;
    state: ProductState;
  };
};
