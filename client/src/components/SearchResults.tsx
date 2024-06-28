import React from 'react';
import { Box, Skeleton } from '@mui/material';
import SearchResultItem from './SearchResultItem';
import { SearchResultsProps } from '../types/types';

const SearchResults: React.FC<SearchResultsProps> = ({ results, query, loading }) => (
  <Box>
    {loading ? (
      <Skeleton variant="rectangular" width="100%" height={118} />
    ) : (
      results.map((result, index) => (
        <SearchResultItem key={index} result={result} query={query} />
      ))
    )}
  </Box>
);

export default SearchResults;
