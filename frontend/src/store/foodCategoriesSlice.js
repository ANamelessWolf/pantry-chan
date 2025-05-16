import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFoodCategories = createAsyncThunk(
  'foodCategories/fetch',
  async () => {
    const res = await axios.get('/api/foodCategories');
    return res.data;
  }
);

const foodCategoriesSlice = createSlice({
  name: 'foodCategories',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFoodCategories.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default foodCategoriesSlice.reducer;
