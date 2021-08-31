import { Reducer, useReducer } from 'react';
import { ProductState } from '../app-types';
import { Product, ProductDiscount } from '../interfaces';

type Action =
  | { type: 'FIND_ALL'; products: Product[] }
  | { type: 'FIND_ALL_WITH_DISCOUNT'; products: Product[]; productsDiscounts: ProductDiscount[] }
  | { type: 'ADD'; product: Product }
  | { type: 'UPDATE'; id: number; product: Product }
  | { type: 'REMOVE'; id: number }
  | { type: 'FINDING_ALL'; findingAll: boolean }
  | { type: 'FINDING_ALL_WITH_DISCOUNT'; findingAllWithDiscount: boolean }
  | { type: 'ADDING'; adding: boolean }
  | { type: 'UPDATING'; updating: boolean }
  | { type: 'REMOVING'; removing: boolean }
  | { type: 'ERROR'; error: string };

const initialState: ProductState = {
  products: [],
  findingAll: false,
  findingAllWithDiscount: false,
  adding: false,
  updating: false,
  removing: false,
  error: '',
};

export const useProductReducer = () => {
  const findAll = (products: Product[], state: ProductState) => {
    return { ...state, products };
  };

  const findAllWithDiscount = (products: Product[], productsDiscounts: ProductDiscount[], state: ProductState) => {
    const productsWithDiscounts = products.map((product) => {
      const foundProductDiscount = productsDiscounts.find(
        (productDiscount) => productDiscount.productId === product.id
      );

      if (foundProductDiscount) {
        product.discount = foundProductDiscount;
      }

      return product;
    });

    return { ...state, products: productsWithDiscounts };
  };

  const add = (product: Product, state: ProductState) => {
    const products = [...state.products, product];
    return { ...state, products, error: '' };
  };

  const update = (id: number, product: Product, state: ProductState) => {
    let products = [...state.products];
    products = products.map((item) => {
      if (item.id === id) {
        return { ...item, ...product };
      }

      return item;
    });

    return { ...state, products, error: '' };
  };

  const remove = (id: number, state: ProductState) => {
    const products = [...state.products].filter((product) => product.id !== id);
    return { ...state, products, error: '' };
  };

  const setFindingAll = (findingAll: boolean, state: ProductState) => {
    return { ...state, findingAll };
  };

  const setFindingAllWithDiscount = (findingAllWithDiscount: boolean, state: ProductState) => {
    return { ...state, findingAllWithDiscount };
  };

  const setAdding = (adding: boolean, state: ProductState) => {
    return { ...state, adding };
  };

  const setUpdating = (updating: boolean, state: ProductState) => {
    return { ...state, updating };
  };

  const setRemoving = (removing: boolean, state: ProductState) => {
    return { ...state, removing };
  };

  const setError = (error: string, state: ProductState) => {
    return { ...state, error };
  };

  return useReducer<Reducer<ProductState, Action>>((state, action) => {
    switch (action.type) {
      case 'FIND_ALL':
        return findAll(action.products, state);
      case 'FIND_ALL_WITH_DISCOUNT':
        return findAllWithDiscount(action.products, action.productsDiscounts, state);
      case 'ADD':
        return add(action.product, state);
      case 'UPDATE':
        return update(action.id, action.product, state);
      case 'REMOVE':
        return remove(action.id, state);
      case 'FINDING_ALL':
        return setFindingAll(action.findingAll, state);
      case 'FINDING_ALL_WITH_DISCOUNT':
        return setFindingAllWithDiscount(action.findingAllWithDiscount, state);
      case 'ADDING':
        return setAdding(action.adding, state);
      case 'UPDATING':
        return setUpdating(action.updating, state);
      case 'REMOVING':
        return setRemoving(action.removing, state);
      case 'ERROR':
        return setError(action.error, state);
      default:
        return state;
    }
  }, initialState);
};
