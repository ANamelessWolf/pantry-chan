import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filtersActive: false,
    foodFilters: {
      category: '',
      name: '',
      macros: [],
    },
  },
  reducers: {
    setFoodFilters: (state, action) => {
      state.foodFilters = action.payload;
      state.filtersActive = !!(
        action.payload.category ||
        action.payload.name ||
        action.payload.macros?.length
      );
    },
    clearFilters: (state) => {
      state.foodFilters = { category: '', name: '', macros: [] };
      state.filtersActive = false;
    },
  },
});

export const { setFoodFilters, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;