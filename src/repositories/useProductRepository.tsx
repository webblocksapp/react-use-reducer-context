import { useProductApi, useProductHasDiscountApi } from '../apis';
import { useProductReducer } from '../reducers';
import { Product } from '../interfaces';
import { UseProductRepository } from '../app-types';

export const useProductRepository = (): UseProductRepository => {
  const [state, dispatch] = useProductReducer();
  const { create, findAll } = useProductApi();
  const productHasDiscountApi = useProductHasDiscountApi();

  const fetchAll = async () => {
    try {
      dispatch({ type: 'LOADING', loading: true });
      const { data: products } = await findAll();
      dispatch({ type: 'FIND_ALL', products });
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'An error ocurred' });
    } finally {
      dispatch({ type: 'LOADING', loading: false });
    }
  };

  const fetchAllWithDiscount = async () => {
    try {
      dispatch({ type: 'LOADING', loading: true });

      const { data: productsHasDiscount } = await productHasDiscountApi.findAll();
      let { data: products } = await findAll();

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

  const add = async (product: Product) => {
    try {
      dispatch({ type: 'LOADING', loading: true });
      const { data: createdProduct } = await create(product);
      dispatch({ type: 'ADD', product: createdProduct });
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'An error ocurred' });
    } finally {
      dispatch({ type: 'LOADING', loading: false });
    }
  };

  return {
    productRepository: {
      fetchAll,
      fetchAllWithDiscount,
      add,
      state,
    },
  };
};
