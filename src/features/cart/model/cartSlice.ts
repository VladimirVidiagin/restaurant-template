import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@app/store';

export interface CartState {
  items: Record<string, number>;
}

const initialState: CartState = {
  items: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ slug: string }>) {
      const { slug } = action.payload;
      const current = state.items[slug] ?? 0;
      state.items[slug] = current + 1;
    },
    decrementItem(state, action: PayloadAction<{ slug: string }>) {
      const { slug } = action.payload;
      const current = state.items[slug] ?? 0;

      if (current <= 1) {
        delete state.items[slug];
        return;
      }

      state.items[slug] = current - 1;
    },
    removeItem(state, action: PayloadAction<{ slug: string }>) {
      const { slug } = action.payload;
      delete state.items[slug];
    },
    clearCart(state) {
      state.items = {};
    },
  },
});

export const { addItem, decrementItem, removeItem, clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

export const selectCartItemsMap = (state: RootState): Record<string, number> =>
  (state.cart as CartState).items;

export const selectCartQuantityBySlug = (state: RootState, slug: string): number =>
  (state.cart as CartState).items[slug] ?? 0;

export const selectCartTotalCount = (state: RootState): number => {
  const items = (state.cart as CartState).items;
  return Object.values(items).reduce((acc: number, qty: number) => acc + qty, 0);
};
