import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from '../../types/types';
import { fetchSearchResults, fetchPastQueries } from '../actions/searchActions';

const initialState: SearchState = {
  results: [],
  pastQueries: [],
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
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      state.results = action.payload;
    });
    builder.addCase(fetchPastQueries.fulfilled, (state, action) => {
      state.pastQueries = action.payload;
    });
  },
});

export const { addSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;