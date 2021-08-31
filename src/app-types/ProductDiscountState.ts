import { ProductDiscount } from '../interfaces';

export type ProductDiscountState = {
  productsDiscounts: ProductDiscount[];
  findingAll: boolean;
  error: string;
};
