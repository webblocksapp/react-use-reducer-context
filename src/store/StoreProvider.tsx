import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { useProductReducer } from '../reducers';

const StoreProvider: React.FC = ({ children }) => {
  const store = createStore(combineReducers({ productsRootState: useProductReducer() }));

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
