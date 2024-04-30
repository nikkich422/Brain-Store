import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import dataReducer from "./dataSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    data: dataReducer,
  },
});

export default appStore;
