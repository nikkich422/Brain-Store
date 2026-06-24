import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
    const data = localStorage.getItem('compareItems');
    return {
        items: data ? JSON.parse(data) : [],
    }
}
const compareSlice = createSlice({
    name: 'compare',
    initialState: {
        items: [],
    },
    reducers: {
        addToCompare: (state, action) => {
            const product = action.payload;

            const exists = state.items.find((p) => p._id === product._id);
            if(exists) return;
            if(state.items.length >= 4) return;

            state.items.push(product);
            localStorage.setItem('compareItems', JSON.stringify(state.items));
        },
        removeFromCompare: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((p) => p._id !== id);
            localStorage.setItem('compareItems', JSON.stringify(state.items));
        },
        clearCompare: (state) => {
            state.items = [];
            localStorage.removeItem('compareItems');
        }
    }
})

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;