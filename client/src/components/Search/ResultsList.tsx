import { List } from '@mui/material';
import SearchResultItem from './SearchResultItem';
import { SearchResultsProps } from '../../types/types';

const ResultsList = ({ results, query, isLoading }: SearchResultsProps) => {
  return (
    <List>
      {results.map((result, index) => (
        <SearchResultItem key={index} result={result} query={query} isLoading={isLoading} />
      ))}
    </List>
  );
};

export default ResultsList;