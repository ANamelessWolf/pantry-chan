import { createSlice } from '@reduxjs/toolkit';
import SectionsEnum from '../constants/SectionsEnum';

const sectionSlice = createSlice({
  name: 'section',
  initialState: {
    currentSection: SectionsEnum.HOME,
  },
  reducers: {
    setSection: (state, action) => {
      state.currentSection = action.payload;
    },
  },
});

export const { setSection } = sectionSlice.actions;
export default sectionSlice.reducer;
