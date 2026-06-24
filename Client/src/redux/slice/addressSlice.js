import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/api";

export const getAddresses = createAsyncThunk(
    "address/getAddresses",
    async(_, thunkAPI) => {
        try {
            const res = await API.get(`/api/address`);
            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch Addresses"
            )
        }
    }
)

export const addAddress = createAsyncThunk(
    "address/addAddress",
    async(data, thunkAPI) => {
        try {
            const res = await API.post(`/api/address`, data);
            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to Add Address"
            )
        }
    }
)

export const updateAddress = createAsyncThunk(
    "address/updateAddress",
    async({id, data}, thunkAPI) => {
        try {
            const res = await API.put(`/api/address/${id}`, data);
            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to Update Address"
            )
        }
    }
)

export const deleteAddress = createAsyncThunk(
    "address/deleteAddress",
    async(id, thunkAPI) => {
        try {
            await API.delete(`/api/address/${id}`);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to delete Address"
            )
        }
    }
)

const addressSlice = createSlice({
    name: "address",
    initialState: {
        addresses: [],
        selectedAddress: null,
        loading: false,
        error: null,
    },
    reducers: {
        addAddressLocal: (state, action) => {
            const newAddress = { ...action.payload };

            if(state.addresses.length === 0){
              newAddress.isDefault = true;
            }
            if(newAddress.isDefault){
                state.addresses.forEach((addr) => {
                    addr.isDefault = false;
                })
            }

            state.addresses.unshift({
                ...newAddress,
                isTemp: true,
            })  
        },
        updateAddressLocal: (state, action) => {
            const {id, data} = action.payload;

            if(data.isDefault){
                state.addresses.forEach((addr) => {
                    addr.isDefault = false;
                })
            }

            const index = state.addresses.findIndex((a) => a._id === id);
            if(index !== -1){
                state.addresses[index] = {
                    ...state.addresses[index],
                    ...data,
                }
            }
        },
        deleteAddressLocal: (state, action) => {
            const id = action.payload;

            const deleted = state.addresses.find(a => a._id === id);

            state.addresses = state.addresses.filter(
                (a) => a._id !== id
            )

            if(deleted?.isDefault && state.addresses.length > 0){
                state.addresses[0].isDefault = true;
            }
        },
        restoreAddress: (state, action) => {
            state.addresses.unshift(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
        // get Addresses
        .addCase(getAddresses.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAddresses.fulfilled, (state, action) => {
            state.loading = false;
            state.addresses = action.payload;
        })
        .addCase(getAddresses.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Add Address
        .addCase(addAddress.fulfilled, (state, action) => {
            const newAddr = action.payload;

            const index = state.addresses.findIndex(
                (a) => a.isTemp
            );

            if(index !== -1){
                state.addresses[index] = newAddr;
            }
            else{
                state.addresses.unshift(newAddr);
            }
        })

        // Update Address
        .addCase(updateAddress.fulfilled, (state) => {
            state.loading = false;
        })

        // Delete
        .addCase(deleteAddress.fulfilled, (state) => {
            state.loading = false;
        })
    }
})

export const { addAddressLocal, updateAddressLocal, deleteAddressLocal, restoreAddress } = addressSlice.actions;

export default addressSlice.reducer;