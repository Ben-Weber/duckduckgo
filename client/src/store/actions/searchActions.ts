import { createAsyncThunk } from '@reduxjs/toolkit';

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