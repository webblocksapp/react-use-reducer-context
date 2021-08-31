import { createContext } from 'react';
import { UseProductDiscountRepository, UseProductRepository } from '../app-types';

export type StoreContextType = UseProductRepository & UseProductDiscountRepository;

const context = createContext({} as any);
const StoreContext = context;

export default StoreContext;
