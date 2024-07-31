import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Drug {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface DrugsState {
  drugs: Drug[];
  loading: boolean;
}

const initialState: DrugsState = {
  drugs: [],
  loading: false,
};

export const fetchDrugs = createAsyncThunk('drugs/fetchDrugs', async () => {
  const response = await axios.get('http://localhost:5000/drugs');
  return response.data;
});

const drugsSlice = createSlice({
  name: 'drugs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDrugs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDrugs.fulfilled, (state, action) => {
      state.loading = false;
      state.drugs = action.payload;
    });
    builder.addCase(fetchDrugs.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default drugsSlice.reducer;
