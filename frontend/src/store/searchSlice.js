import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    filters: {},
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    setSearchFilters: (state, action) => {
      const { section, filters } = action.payload;
      state.filters[section] = filters;
    },
  },
});

export const { setSearchQuery, setSearchFilters } = searchSlice.actions;
export default searchSlice.reducer;
