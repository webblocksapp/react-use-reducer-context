import faker from 'faker';
import { Product } from '../../interfaces';

export const randomProduct = (omitKeys: Array<keyof Product> = []): Product => {
  const object: Product = {
    id: faker.datatype.number(),
    name: faker.commerce.productName(),
    location: faker.commerce.productAdjective(),
    price: +faker.commerce.price(),
  };

  omitKeys.forEach((key) => {
    delete object[key];
  });

  return object;
};
