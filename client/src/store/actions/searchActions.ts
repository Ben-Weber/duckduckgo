import { createAsyncThunk } from '@reduxjs/toolkit';
import { SearchResult } from '../../types/types';

export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (query: string) => {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data: SearchResult[] = await response.json();
    const results = data.map((item: SearchResult) => ({
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
      return response.json();
    } catch (error) {
      console.error('Error fetching past results:', error);
      throw error;
    }
  }
);

export const clearQueries = createAsyncThunk(
  'history/clearQueries',
  async () => {
    try {
      const response = await fetch('/api/history/clear', { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error clearing queries:', error);
      throw error;
    }
  }
);