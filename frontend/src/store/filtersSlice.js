import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filtersActive: false,
    foodFilters: {
      category: '',
      macros: [],
    },
  },
  reducers: {
    setFoodFilters: (state, action) => {
      state.foodFilters = action.payload;
      state.filtersActive = true;
    },
    clearFilters: (state) => {
      state.foodFilters = { category: '', macros: [] };
      state.filtersActive = false;
    },
  },
});

export const { setFoodFilters, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;