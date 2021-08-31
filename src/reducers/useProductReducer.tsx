import { ProductReducerState } from '../app-types';
import { Product } from '../interfaces';

type Action =
  | { type: 'FIND_ALL'; products: Product[] }
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; id: number }
  | { type: 'LOADING'; loading: boolean }
  | { type: 'ERROR'; error: string };

const initialState: ProductReducerState = {
  products: [],
  loading: false,
  error: '',
};

export const useProductReducer = (): ((state: ProductReducerState, action: Action) => ProductReducerState) => {
  const findAll = (products: Product[], state: ProductReducerState) => {
    return { ...state, products };
  };

  const add = (product: Product, state: ProductReducerState) => {
    const products = [...state.products, product];
    return { ...state, products, error: '' };
  };

  const remove = (id: number, state: ProductReducerState) => {
    const products = [...state.products].filter((product) => product.id !== id);
    return { ...state, products, error: '' };
  };

  const setLoading = (loading: boolean, state: ProductReducerState) => {
    return { ...state, loading };
  };

  const setError = (error: string, state: ProductReducerState) => {
    return { ...state, error };
  };

  return (state: ProductReducerState = initialState, action: Action) => {
    switch (action.type) {
      case 'FIND_ALL':
        return findAll(action.products, state);
      case 'ADD':
        return add(action.product, state);
      case 'REMOVE':
        return remove(action.id, state);
      case 'LOADING':
        return setLoading(action.loading, state);
      case 'ERROR':
        return setError(action.error, state);
      default:
        return state;
    }
  };
};
