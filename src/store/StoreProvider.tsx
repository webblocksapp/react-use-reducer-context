import React from 'react';
import { useProductRepository } from '../repositories';
import { useProductDiscountRepository } from '../repositories/useProductDiscountRepository';
import StoreContext from './StoreContext';

const StoreProvider: React.FC = ({ children }) => {
  const store = {
    ...useProductRepository(),
    ...useProductDiscountRepository(),
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
