import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as foodApi from '../api/foodApi';

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const fetchFoods = createAsyncThunk(
  'food/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await foodApi.getAllFoods();
      // getAllFoods returns HttpResponse: { data: [...], success, message }
      return res.data.data ?? res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load foods');
    }
  }
);

export const addFood = createAsyncThunk(
  'food/add',
  async (foodData, { rejectWithValue }) => {
    try {
      const res = await foodApi.createFood(foodData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create food');
    }
  }
);

export const editFood = createAsyncThunk(
  'food/edit',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await foodApi.updateFood(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update food');
    }
  }
);

export const removeFood = createAsyncThunk(
  'food/remove',
  async (id, { rejectWithValue }) => {
    try {
      await foodApi.deleteFood(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete food');
    }
  }
);

// ─── Slice ───────────────────────────────────────────────────────────────────

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setFood(state, action) {
      state.items = action.payload;
    },
    clearFoodError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchFoods
      .addCase(fetchFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addFood — after create, a full fetchFoods is triggered from the view
      .addCase(addFood.fulfilled, (state, action) => {
        if (action.payload?.id) state.items.push(action.payload);
      })
      // editFood
      .addCase(editFood.fulfilled, (state, action) => {
        const idx = state.items.findIndex((f) => f.id === action.payload?.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      // removeFood — optimistically remove by UUID id
      .addCase(removeFood.fulfilled, (state, action) => {
        state.items = state.items.filter((f) => f.id !== action.payload);
      });
  },
});

export const { setFood, clearFoodError } = foodSlice.actions;
export default foodSlice.reducer;
