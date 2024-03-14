import { Dispatch, createContext } from 'react';
import { IAction } from '../../reducer/ProductReducer';

export const ProductDispatchContext = createContext<Dispatch<IAction>>(() => {
  return;
});
