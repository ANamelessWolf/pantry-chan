import { createSlice } from '@reduxjs/toolkit';

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    items: []
  },
  reducers: {
    setFood(state, action) {
      state.items = action.payload;
    }
  }
});

export const { setFood } = foodSlice.actions;
export default foodSlice.reducer;
