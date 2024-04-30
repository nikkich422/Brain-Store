import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.cartItems.push(action.payload);
    },
    deleteAll: (state) => {
      state.cartItems.length = 0;
    },
    deleteOne: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { addItem, deleteAll, deleteOne } = cartSlice.actions;

export default cartSlice.reducer;
