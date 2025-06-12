import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  title: string;
  quantity: number;
  price: number;
};

export type UserCartState = {
  phone: string;
  cart: CartItem[];
};

const initialState: UserCartState = {
  phone: "",
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload;
    },
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.price = action.payload.price;
      } else {
        state.cart.push(action.payload);
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const item = state.cart.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  setPhone,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
