import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './foodSlice';
import sectionReducer from './sectionSlice';
import searchReducer from './searchSlice';
import filtersReducer from './filtersSlice';
import filterModalReducer from './filterModalSlice';
import foodCategoriesReducer from './foodCategoriesSlice';
import macroTypesReducer from './macroTypesSlice';
import unitsReducer from './unitsSlice';

export default configureStore({
  reducer: {
    food: foodReducer,
    section: sectionReducer,
    search: searchReducer,
    filters: filtersReducer,
    filterModal: filterModalReducer,
    foodCategories: foodCategoriesReducer,
    macroTypes: macroTypesReducer,
    units: unitsReducer,
  },
});
