import React from 'react';
import { useProductRepository } from '../repositories';
import StoreContext from './StoreContext';

const StoreProvider: React.FC = ({ children }) => {
  const store = {
    ...useProductRepository(),
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
