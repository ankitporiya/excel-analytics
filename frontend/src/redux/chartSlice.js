// redux/chartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Create chart
export const createChart = createAsyncThunk(
  'charts/create',
  async (chartData, { rejectWithValue }) => {
    try {
      const response = await api.post('/charts', chartData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get user charts
export const getUserCharts = createAsyncThunk(
  'charts/getUserCharts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/charts');
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chartSlice = createSlice({
  name: 'charts',
  initialState: {
    charts: [],
    currentChart: null,
    loading: false,
    error: null,
    createSuccess: false
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCreateSuccess: (state) => {
      state.createSuccess = false;
    },
    setCurrentChart: (state, action) => {
      state.currentChart = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChart.fulfilled, (state, action) => {
        state.loading = false;
        state.createSuccess = true;
        state.currentChart = action.payload.chart;
        state.charts.unshift(action.payload.chart);
      })
      .addCase(createChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserCharts.fulfilled, (state, action) => {
        state.charts = action.payload;
      });
  }
});

export const { clearError, clearCreateSuccess, setCurrentChart } = chartSlice.actions;
export default chartSlice.reducer;