import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectPaginatedResults = createSelector(
  (state: RootState) => state.search.searchResults,
  (state: RootState, currentPage: number) => currentPage,
  (state: RootState, currentPage: number, resultsPerPage: number) =>
    resultsPerPage,
  (searchResults, currentPage, resultsPerPage) => {
    return searchResults.slice(
      (currentPage - 1) * resultsPerPage,
      currentPage * resultsPerPage
    );
  }
);
