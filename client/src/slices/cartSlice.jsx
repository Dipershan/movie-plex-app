import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      // if item duplicate
      const existingItem = state.cart.find(
        (item) => item.slug === action.payload.slug
      );
      if (existingItem) {
        if (existingItem.quantity < action.payload.seats) {
          existingItem.quantity++;
          state.quantity++;
        }
      } else {
        // allow add new item
        state.cart.push({ ...action.payload, quantity: 1 });
        state.quantity++;
      }
    },
    remove: (state, action) => {
      const newItems = state.cart.filter(
        (item) => item.slug !== action.payload
      );
      state.cart = newItems;
      state.quantity = newItems.reduce((acc, obj) => acc + obj.quantity, 0);
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item?.slug === action?.payload?.slug
      );
      if (existingItem && existingItem?.quantity < action?.payload?.seats) {
        existingItem.quantity++;
        state.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item?.slug === action?.payload?.slug
      );
      if (existingItem.quantity === 1) {
        return;
      } else {
        existingItem.quantity--;
        state.quantity--;
      }
    },
    removeAll: (state) => {
      state.cart = [];
      state.quantity = 0;
    },
  },
});

export const { add, remove, increaseQuantity, decreaseQuantity, removeAll } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;