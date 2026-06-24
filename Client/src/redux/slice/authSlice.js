import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/api";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            const res = await API.post("/api/user/register", userData);
            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            const res = await API.post("/api/user/login", userData);
            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)

export const verifyOtp = createAsyncThunk(
    "auth/verifyOtp",
    async (data, thunkAPI) => {
        try {
            const res = await API.post("/api/user/verify-otp", data);
            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)

export const sendOtpResetPassword = createAsyncThunk(
    "auth/sendOtpResetPassword",
    async (data, thunkAPI) => {
        try {
            const res = await API.post("/api/user/reset-password/send-otp", data);
            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (data, thunkAPI) => {
        try {
            const res = await API.post("/api/user/reset-password", data);
            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)

export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (data, thunkAPI) => {
        try {
            const res = await API.put("/api/user/update", data);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await API.post("/api/user/logout");
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        accessToken: null,
        loading: false,
        error: null,
        status: "idle",
        isAuthChecked: false,
    },
    reducers: {
        setToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logoutLocal: (state) => {
            state.user = null;
            state.accessToken = null;
            state.status = "idle";
            state.error = null;
        },
        resetAuthState: (state) => {
            state.loading = false;
            state.error = null;
            state.status = "idle";
        },
        setAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder

        // Register
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.status = "success";
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.status = "error";
            state.error = action.payload;
        })

        // Login 
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data.user;
            state.accessToken = action.payload.data.accessToken;
            state.status = "success";
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.status = "error";
            state.error = action.payload;
        })

        // verify OTP
        .addCase(verifyOtp.pending, (state) => {
            state.loading = true;
        })
        .addCase(verifyOtp.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data.user;
            state.accessToken = action.payload.data.accessToken;
            state.status = "success";
        })
        .addCase(verifyOtp.rejected, (state, action) => {
            state.loading = false;
            state.status = "error";
            state.error = action.payload;
        })

        // reset password
        .addCase(resetPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(resetPassword.fulfilled, (state) => {
            state.loading = false;
            state.status = "success";
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.status = "error";
            state.error = action.payload?.message || "Reset failed";
        })

        // send OTP reset
        .addCase(sendOtpResetPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(sendOtpResetPassword.fulfilled, (state) => {
            state.loading = false;
            state.status = "success";
        })
        .addCase(sendOtpResetPassword.rejected, (state, action) => {
            state.loading = false;
            state.status = "error";
            state.error = action.payload?.message || "OTP send failed";
        })

        // update profile
        .addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.status = "success";
            state.user = action.payload.user;
        })
        .addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.status = "error";
            state.error = action.payload?.message || "Update failed";
        })

        // logout
        .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.accessToken = null;
            state.status = "idle";
        })
    }
});

export const { resetAuthState, setToken, setUser, logoutLocal, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;