import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from '../../types/types';
import { fetchSearchResults, fetchPastQueries } from '../actions/searchActions';

const initialState: SearchState = {
  searchResults: [],
  pastQueries: [],
  isLoading: false, 
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchQuery: (state, action: PayloadAction<string>) => {
      state.pastQueries.unshift(action.payload);
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
      });
  },
});

export const { addSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;