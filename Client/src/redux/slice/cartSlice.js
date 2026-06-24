import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/api";

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, thunkAPI) => {
    try {
      const res = await API.get(`/api/cart`);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get cart Items"
      );
    }
  }
);

export const updateCartItems = createAsyncThunk(
  "cart/updateCartItems",
  async (data, thunkAPI) => {
    try {
      const res = await API.post(`/api/cart`, data);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Update Cart failed"
      );
    }
  }
);

export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartItem",
    async ({productId, size}, thunkAPI) => {
        try {
            await API.delete(`/api/cart/${productId}?size=${size || ""}`);
            return { productId, size };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Delete cart item failed");
        }
    }
)

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    showCartDrawer: false,
    loading: false,
    error: null,
  },
  reducers: {
    toggleCartDrawer: (state) => {
      state.showCartDrawer = !state.showCartDrawer;
    },
    closeCartDrawer: (state) => {
      state.showCartDrawer = false;
    },
    openCartDrawer: (state) => {
      state.showCartDrawer = true;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    addToCartLocal: (state, action) => {
        const item = action.payload;

        const index = state.cartItems.findIndex(
          (i) => (i.productId?._id === item.productId || i.productId === item.productId) && (i.size || null) === (item.size || null)
        );

        if(index !== -1){
            state.cartItems[index].quantity = item.quantity;
        }
        else{
            state.cartItems.push(item);
        }
    },
    removeFromCartLocal: (state, action) => {
        const {productId, size} = action.payload;

        state.cartItems = state.cartItems.filter(
          (item) => {
            const id = item.productId?._id || item.productId;
            return !(id === productId && (item.size || null) === (size || null));
          } 
        )
    },
    updateQtyLocal: (state, action) => {
        const { productId, quantity, size } = action.payload;

        const item = state.cartItems.find(
          (i) => ( i.productId?._id || i.productId ) === productId && ( i.size || null ) === (size || null )
        )
        if(item){
          item.quantity = quantity;
        }
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Cart
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update cart
      .addCase(updateCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItems.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete cart
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        const { productId, size } = action.payload;
      
        state.cartItems = state.cartItems.filter((item) => {
          const id = item.productId?._id || item.productId;
          return !(id === productId && (item.size || null) === (size || null));
        });
      });
  },
});

export const { toggleCartDrawer, closeCartDrawer, clearCart, addToCartLocal, removeFromCartLocal, updateQtyLocal, openCartDrawer } = cartSlice.actions;
export default cartSlice.reducer;
