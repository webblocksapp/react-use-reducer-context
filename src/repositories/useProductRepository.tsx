import useProductApi from '../apis/useProductApi';
import { useProductReducer } from '../reducers';
import { Product } from '../interfaces';
import { UseProductRepository } from '../app-types';

export const useProductRepository = (): UseProductRepository => {
  const { data: state, dispatch } = useProductReducer();
  const { create, findAll } = useProductApi();

  const fetchAll = async () => {
    if (!state.products.length) {
      try {
        dispatch({ type: 'LOADING', loading: true });
        const { data: products } = await findAll();
        dispatch({ type: 'FIND_ALL', products });
      } catch (error) {
        dispatch({
          type: 'ERROR',
          error: 'An error ocurred',
        });
      } finally {
        dispatch({ type: 'LOADING', loading: false });
      }
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
      add,
      state,
    },
  };
};
