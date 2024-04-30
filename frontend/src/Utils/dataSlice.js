import { createSlice } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    userLogin: false,
  },
  reducers: {
    setUserLogin: (state) => {
      state.userLogin = !state.userLogin;
    },
  },
});

export const { setUserLogin } = dataSlice.actions;

export default dataSlice.reducer;
