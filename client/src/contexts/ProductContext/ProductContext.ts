import { createContext } from 'react';
import { IProduct } from '../../models/IProduct';

export const ProductsContext = createContext<IProduct[]>([]);
