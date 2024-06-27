import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

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
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    const results = data.map((item: any) => ({
      title: item.title,
      url: item.url,
    }));
    return results;
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