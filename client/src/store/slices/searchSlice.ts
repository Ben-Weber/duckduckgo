import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from '../../types/types';
import { fetchSearchResults, fetchPastQueries, clearQueries } from '../actions/searchActions';

const initialState: SearchState = {
  searchResults: [],
  pastQueries: [],
  isLoading: false,
  isClearHistoryLoading: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchQuery: (state, action: PayloadAction<string>) => {
      state.pastQueries.unshift(action.payload);
    },
    clearQueriesState: (state) => {
      state.pastQueries = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchPastQueries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPastQueries.fulfilled, (state, action) => {
        state.pastQueries = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPastQueries.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(clearQueries.pending, (state) => {
        state.isClearHistoryLoading = true;
      })
      .addCase(clearQueries.fulfilled, (state) => {
        state.pastQueries = [];
        state.searchResults = [];
        state.isClearHistoryLoading = false;
      })
      .addCase(clearQueries.rejected, (state) => {
        state.isClearHistoryLoading = false;
      });
  },
});

export const { addSearchQuery, clearQueriesState } = searchSlice.actions;
export default searchSlice.reducer;