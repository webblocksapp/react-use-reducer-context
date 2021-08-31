import { Reducer, useReducer } from 'react';
import { ProductDiscountState } from '../app-types';
import { ProductDiscount } from '../interfaces';

type Action =
  | { type: 'FIND_ALL'; productsDiscounts: ProductDiscount[] }
  | { type: 'FINDING_ALL'; findingAll: boolean }
  | { type: 'ERROR'; error: string };

const initialState: ProductDiscountState = {
  productsDiscounts: [],
  findingAll: false,
  error: '',
};

export const useProductDiscountReducer = () => {
  const findAll = (productsDiscounts: ProductDiscount[], state: ProductDiscountState) => {
    return { ...state, productsDiscounts };
  };

  const setFindingAll = (findingAll: boolean, state: ProductDiscountState) => {
    return { ...state, findingAll };
  };

  const setError = (error: string, state: ProductDiscountState) => {
    return { ...state, error };
  };

  return useReducer<Reducer<ProductDiscountState, Action>>((state, action) => {
    switch (action.type) {
      case 'FIND_ALL':
        return findAll(action.productsDiscounts, state);
      case 'FINDING_ALL':
        return setFindingAll(action.findingAll, state);
      case 'ERROR':
        return setError(action.error, state);
      default:
        return state;
    }
  }, initialState);
};
