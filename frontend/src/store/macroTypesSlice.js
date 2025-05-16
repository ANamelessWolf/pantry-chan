import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMacroTypes = createAsyncThunk(
  'macroTypes/fetch',
  async () => {
    const res = await axios.get('/api/macros');
    return res.data;
  }
);

const macroTypesSlice = createSlice({
  name: 'macroTypes',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMacroTypes.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default macroTypesSlice.reducer;
