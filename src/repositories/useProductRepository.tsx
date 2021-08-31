import { useProductApi, useProductHasDiscountApi } from '../apis';
import { Product } from '../interfaces';
import { RootState, UseProductRepository } from '../app-types';
import { useDispatch, useSelector } from 'react-redux';

export const useProductRepository = (): UseProductRepository => {
  const productApi = useProductApi();
  const dispatch = useDispatch();
  const productHasDiscountApi = useProductHasDiscountApi();
  const state = useSelector((rootState: RootState) => rootState.productsRootState);

  const findAll = async () => {
    try {
      dispatch({ type: 'LOADING', loading: true });
      const { data: products } = await productApi.findAll();
      dispatch({ type: 'FIND_ALL', products });
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'An error ocurred' });
    } finally {
      dispatch({ type: 'LOADING', loading: false });
    }
  };

  const findAllWithDiscount = async () => {
    try {
      dispatch({ type: 'LOADING', loading: true });

      const { data: productsHasDiscount } = await productHasDiscountApi.findAll();
      let { data: products } = await productApi.findAll();

      products = products.map((product) => {
        const foundProductWithDiscount = productsHasDiscount.find((item) => item.productId === product.id);
        if (foundProductWithDiscount) {
          return { ...product, discountPercentage: foundProductWithDiscount.discountPercentage };
        }

        return product;
      });

      dispatch({ type: 'FIND_ALL', products });
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'An error ocurred' });
    } finally {
      dispatch({ type: 'LOADING', loading: false });
    }
  };

  const create = async (product: Product) => {
    try {
      dispatch({ type: 'LOADING', loading: true });
      const { data: createdProduct } = await productApi.create(product);
      dispatch({ type: 'ADD', product: createdProduct });
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'An error ocurred' });
    } finally {
      dispatch({ type: 'LOADING', loading: false });
    }
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
