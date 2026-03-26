import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const fetchUnits = createAsyncThunk(
  'units/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/unit');
      // Response: HttpResponse { data: [...], success, message }
      return res.data?.data ?? res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load units');
    }
  }
);

export const createUnit = createAsyncThunk(
  'units/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post('/unit', data);
      return res.data?.data ?? res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create unit');
    }
  }
);

// ─── Slice ───────────────────────────────────────────────────────────────────

const unitsSlice = createSlice({
  name: 'units',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload ?? [];
      })
      .addCase(fetchUnits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUnit.fulfilled, (state, action) => {
        if (action.payload?.id) state.items.push(action.payload);
      });
  },
});

export default unitsSlice.reducer;
