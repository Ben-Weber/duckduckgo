import React from 'react';
import { List } from '@mui/material';
import SearchResultItem from './SearchResultItem';
import { SearchResultsProps } from '../types/types';

const ResultsList: React.FC<SearchResultsProps> = ({ results, query }) => {
  return (
    <List>
      {results.map((result, index) => (
        <SearchResultItem key={index} result={result} query={query} />
      ))}
    </List>
  );
};

export default ResultsList;