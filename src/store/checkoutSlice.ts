import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkoutCart = createAsyncThunk(
    'auth/checkoutCart',
    async (productData:any) => {
      const response = await axios.post('http://localhost:5000/orders', productData);
      return response.data;
    }
  );