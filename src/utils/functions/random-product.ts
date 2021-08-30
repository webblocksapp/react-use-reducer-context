import faker from 'faker';
import { Product } from '../../interfaces';

export const randomProduct = (): Product => {
  return {
    id: faker.datatype.number(),
    name: faker.commerce.productName(),
    location: faker.commerce.productAdjective(),
    price: +faker.commerce.price(),
  };
};
