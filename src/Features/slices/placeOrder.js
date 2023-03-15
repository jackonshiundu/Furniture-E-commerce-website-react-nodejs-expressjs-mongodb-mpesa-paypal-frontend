import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api';

export const payOndelivery = createAsyncThunk(
  'order/payondelivery',
  async ({ formData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.payOndelivery(formData);
      toast.success('Order PLaced Successfully');
      navigate('/buyfurnitures');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getOrder = createAsyncThunk(
  'order/getorders',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getOrder(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const mpesaStkPush = createAsyncThunk(
  'order/mpesastkpush',
  async ({ formData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.mpesaStkPush(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const orderSlice = createSlice({
  name: 'placeorderslice',
  initialState: {
    loading: false,
    user: null,
    orders: [],
    message: '',
  },
  reducers: {},
  extraReducers: {
    [payOndelivery.pending]: (state, action) => {
      state.loading = true;
    },
    [payOndelivery.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [payOndelivery.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [getOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    [getOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default orderSlice.reducer;
