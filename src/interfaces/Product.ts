import { ProductDiscount } from './ProductDiscount';

export interface Product {
  id: number;
  name: string;
  price: number;
  location: string;
  discount?: ProductDiscount;
}
