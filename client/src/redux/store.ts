import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import workshopReducer from './workshopSlice';

export const store = configureStore({
  reducer: { cart: cartReducer, workshop: workshopReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
