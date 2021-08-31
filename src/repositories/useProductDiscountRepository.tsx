import { useProductDiscountApi } from '../apis';
import { useProductDiscountReducer } from '../reducers';
import { UseProductDiscountRepository } from '../app-types';
import { ProductDiscount } from '../interfaces';

export const useProductDiscountRepository = (): UseProductDiscountRepository => {
  const [state, dispatch] = useProductDiscountReducer();
  const productDiscountApi = useProductDiscountApi();

  const findAll = async () => {
    let productsDiscounts: ProductDiscount[] = [];

    try {
      dispatch({ type: 'FINDING_ALL', findingAll: true });
      productsDiscounts = (await productDiscountApi.findAll()).data;
      dispatch({ type: 'FIND_ALL', productsDiscounts });
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'An error ocurred' });
    } finally {
      dispatch({ type: 'FINDING_ALL', findingAll: false });
    }

    return productsDiscounts;
  };

  return {
    productDiscountRepository: {
      findAll,
      state,
    },
  };
};
