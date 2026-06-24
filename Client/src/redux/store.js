import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice';
import cartReducer from './slice/cartSlice';
import addressReducer from './slice/addressSlice';
import wishlistReducer from './slice/wishlistSlice';
import compareReducer from './slice/compareSlice';
import { injectStore } from "../api/api";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        address: addressReducer,
        wishlist: wishlistReducer,
        compare: compareReducer,
    }
})

injectStore(store);