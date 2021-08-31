import { useProductApi, useProductDiscountApi } from '../apis';
import { useProductReducer } from '../reducers';
import { Product } from '../interfaces';
import { UseProductRepository } from '../app-types';

export const useProductRepository = (): UseProductRepository => {
  const [state, dispatch] = useProductReducer();
  const productApi = useProductApi();
  const productDiscountApi = useProductDiscountApi();

  const findAll = async () => {
    try {
      dispatch({ type: 'FINDING_ALL', findingAll: true });
      const products = (await productApi.findAll()).data;
      dispatch({ type: 'FIND_ALL', products });
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'An error ocurred' });
    } finally {
      dispatch({ type: 'FINDING_ALL', findingAll: false });
    }
  };

  const findAllWithDiscount = async () => {
    try {
      dispatch({ type: 'FINDING_ALL_WITH_DISCOUNT', findingAllWithDiscount: true });
      const products = (await productApi.findAll()).data;
      const productsDiscounts = (await productDiscountApi.findAll()).data;
      dispatch({ type: 'FIND_ALL_WITH_DISCOUNT', products, productsDiscounts });
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'An error ocurred' });
    } finally {
      dispatch({ type: 'FINDING_ALL_WITH_DISCOUNT', findingAllWithDiscount: false });
    }
  };

  const create = async (product: Product) => {
    try {
      dispatch({ type: 'ADDING', adding: true });
      const createdProduct = (await productApi.create(product)).data;
      dispatch({ type: 'ADD', product: createdProduct });
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'An error ocurred' });
    } finally {
      dispatch({ type: 'ADDING', adding: false });
    }
  };

  const update = async (id: number, product: Product) => {
    try {
      dispatch({ type: 'UPDATING', updating: true });
      const updatedProduct = (await productApi.update(id, product)).data;
      dispatch({ type: 'UPDATE', id, product: updatedProduct });
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'An error ocurred' });
    } finally {
      dispatch({ type: 'UPDATING', updating: false });
    }
  };

  const remove = async (id: number) => {
    try {
      dispatch({ type: 'REMOVING', removing: true });
      await productApi.remove(id);
      dispatch({ type: 'REMOVE', id });
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'An error ocurred' });
    } finally {
      dispatch({ type: 'REMOVING', removing: false });
    }
  };

  return {
    productRepository: {
      findAll,
      findAllWithDiscount,
      create,
      update,
      remove,
      state,
    },
  };
};
