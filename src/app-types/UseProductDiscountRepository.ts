import { ProductDiscount } from '../interfaces';
import { ProductDiscountState } from './ProductDiscountState';

export type UseProductDiscountRepository = {
  productDiscountRepository: {
    findAll: () => Promise<ProductDiscount[]>;
    state: ProductDiscountState;
  };
};
