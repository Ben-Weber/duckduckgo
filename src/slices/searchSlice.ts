import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface SearchState {
  results: Array<{ title: string; description: string; url: string }>;
  pastQueries: string[];
}

const initialState: SearchState = {
  results: [],
  pastQueries: [],
};

export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (query: string) => {
    const response = await axios.get('http://api.duckduckgo.com', {
      params: { q: query, format: 'json' },
    });
    console.log('response', response);
    return response.data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchQuery: (state, action: PayloadAction<string>) => {
      state.pastQueries.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      state.results = action.payload;
    });
  },
});

export const { addSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;