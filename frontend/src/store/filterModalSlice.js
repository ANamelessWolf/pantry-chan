import { createSlice } from '@reduxjs/toolkit';

const filterModalSlice = createSlice({
  name: 'filterModal',
  initialState: { open: false },
  reducers: {
    openFilterModal: (state) => { state.open = true; },
    closeFilterModal: (state) => { state.open = false; },
  },
});

export const { openFilterModal, closeFilterModal } = filterModalSlice.actions;
export default filterModalSlice.reducer;
