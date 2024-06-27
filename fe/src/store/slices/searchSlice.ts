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

export const fetchPastQueries = createAsyncThunk(
  'search/fetchPastQueries',
  async () => {
    try {
      const response = await fetch('/api/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching past results:', error);
      throw error;
    }
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
    builder.addCase(fetchPastQueries.fulfilled, (state, action) => {
      console.log('state, action', state, action);
      state.pastQueries = action.payload;
    });
  },
});

export const { addSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;