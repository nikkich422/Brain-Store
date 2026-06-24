import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/api";

export const fetchWishlist = createAsyncThunk(
    "wishlist/fetch",
    async () => {
        const {data} = await API.get("/api/wishlist");
        return data.data;
    }
)

export const toggleWishlist = createAsyncThunk(
    "wishlist/toggle",
    async (productId) => {
        const {data} = await API.post("/api/wishlist", {productId});
        return data.products;
    }
)

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [],
        loading: false,
    },
    reducers: {
        toggleLocalWishlist: (state, action) => {
            const product = action.payload;
            const id = product._id;

            const exists = state.items.some((item) => item._id.toString() === id.toString());

            if(exists){
                state.items = state.items.filter((item) => item._id.toString() !== id.toString());
            }
            else{
                state.items.push(product);
            }
        }
    },

    extraReducers: (builder) => {
        builder
        // fetch
        .addCase(fetchWishlist.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchWishlist.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })

        // toggle
        .addCase(toggleWishlist.fulfilled, (state, action) => {
            state.items = action.payload;
        })
    }
})

export const { toggleLocalWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;