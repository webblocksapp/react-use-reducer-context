import { Product } from '../interfaces';
import { ProductState } from './ProductState';

export type UseProductRepository = {
  productRepository: {
    findAll: () => Promise<Product[]>;
    findAllWithDiscount: () => Promise<Product[]>;
    create: (product: Product) => Promise<Product>;
    state: ProductState;
  };
};
