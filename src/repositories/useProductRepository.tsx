import { useProductApi } from '../apis';
import { useProductReducer } from '../reducers';
import { Product } from '../interfaces';
import { UseProductRepository } from '../app-types';
import { useProductDiscountRepository } from './useProductDiscountRepository';

export const useProductRepository = (): UseProductRepository => {
  const [state, dispatch] = useProductReducer();
  const productApi = useProductApi();
  const { productDiscountRepository } = useProductDiscountRepository();

  const findAll = async () => {
    let products: Product[] = [];

    try {
      dispatch({ type: 'FINDING_ALL', findingAll: true });
      products = (await productApi.findAll()).data;
      dispatch({ type: 'FIND_ALL', products });
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'An error ocurred' });
    } finally {
      dispatch({ type: 'FINDING_ALL', findingAll: false });
    }

    return products;
  };

  const findAllWithDiscount = async () => {
    let productsWithDiscounts: Product[] = [];

    try {
      dispatch({ type: 'FINDING_ALL_WITH_DISCOUNT', findingAllWithDiscount: true });
      const products = await findAll();
      const productsDiscounts = await productDiscountRepository.findAll();

      productsWithDiscounts = products.map((product) => {
        const foundProductDiscount = productsDiscounts.find(
          (productDiscount) => productDiscount.productId === product.id
        );

        if (foundProductDiscount) {
          product.discount = foundProductDiscount;
        }

        return product;
      });

      dispatch({ type: 'FIND_ALL_WITH_DISCOUNT', productsWithDiscounts });
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'An error ocurred' });
    } finally {
      dispatch({ type: 'FINDING_ALL_WITH_DISCOUNT', findingAllWithDiscount: false });
    }

    return productsWithDiscounts;
  };

  const create = async (product: Product) => {
    let createdProduct: Product = product;

    try {
      dispatch({ type: 'ADDING', adding: true });
      createdProduct = (await productApi.create(product)).data;
      dispatch({ type: 'ADD', product: createdProduct });
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'An error ocurred' });
    } finally {
      dispatch({ type: 'ADDING', adding: false });
    }

    return createdProduct;
  };

  return {
    productRepository: {
      findAll,
      findAllWithDiscount,
      create,
      state,
    },
  };
};
