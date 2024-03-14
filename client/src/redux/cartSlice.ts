import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../models/IProduct';
import { RootState } from './store';

interface ICartItem {
  id: number;
  product: IProduct;
  quantity: number;
}

interface ICartState {
  quantities: { [productId: number]: number };
  products: { [productId: number]: ICartItem };
}

const initialState: ICartState = {
  quantities: JSON.parse(localStorage.getItem('cartQuantities') || '{}'),
  products: JSON.parse(localStorage.getItem('cartProducts') || '{}'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: IProduct; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;

      const productId = product.id;

      state.quantities[productId] =
        (state.quantities[productId] || 0) + quantity;

      if (state.products[productId]) {
        state.products[productId].quantity += quantity;
      } else {
        state.products[productId] = { id: productId, product, quantity };
      }

      localStorage.setItem('cartQuantities', JSON.stringify(state.quantities));
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.quantities[productId] = (state.quantities[productId] || 0) + 1;
      state.products[productId].quantity += 1;
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;

      if (state.quantities[productId] > 1) {
        state.quantities[productId] -= 1;
        state.products[productId].quantity -= 1;
      } else {
        delete state.products[productId];
        delete state.quantities[productId];
      }

      localStorage.setItem('cartQuantities', JSON.stringify(state.quantities));
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;

      if (state.quantities[productId] > 0) {
        state.quantities[productId] -= 1;
        state.products[productId].quantity -= 1;

        if (state.quantities[productId] === 0) {
          delete state.products[productId];
        }
      }

      localStorage.setItem('cartQuantities', JSON.stringify(state.quantities));
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },

    resetCart: (state) => {
      state.quantities = {};
      state.products = {};

      localStorage.removeItem('cartQuantities');
      localStorage.removeItem('cartProducts');
    },
  },
});

export const getProductCount = (state: RootState) => {
  return Object.values(state.cart.quantities).reduce(
    (sum, count) => sum + count,
    0
  );
};

export const getMemoizedProducts = createSelector(
  (state: RootState) => state.cart.products,
  (products) => Object.values(products)
);

export const getTotalPrice = createSelector(
  (state: RootState) => state.cart.products,
  (state: RootState) => state.cart.quantities,
  (products, quantities) => {
    let subtotal = 0;
    const shippingCost = 45;

    for (const item of Object.values(products)) {
      subtotal += item.product.attributes.price * (quantities[item.id] || 0);
    }

    const total = subtotal + shippingCost;
    return total.toFixed(2);
  }
);

export const getSubtotal = createSelector(
  (state: RootState) => state.cart.products,
  (state: RootState) => state.cart.quantities,
  (products, quantities) => {
    let subtotal = 0;

    for (const item of Object.values(products)) {
      subtotal += item.product.attributes.price * (quantities[item.id] || 0);
    }

    return subtotal.toFixed(2);
  }
);

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
