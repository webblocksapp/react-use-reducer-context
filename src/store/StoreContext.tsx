import { createContext } from 'react';
import { UseProductRepository } from '../app-types';

export type StoreContextType = UseProductRepository;

const context = createContext({} as any);
const StoreContext = context;

export default StoreContext;
