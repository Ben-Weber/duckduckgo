import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Pagination from '../components/Pagination';
import PastQueries from './PastQueries';
import { ResultsBox, NoResultsBox } from './StyledComponents';
import ResultsHeader from './ResultsHeader';
import ResultsList from './ResultsList';
import { SearchContainerProps } from '../types/types';

const SearchContainer: React.FC<SearchContainerProps> = ({
  results,
  query,
  loading,
  totalResults,
  resultsPerPage,
  currentPage,
  pastQueries,
  onPageChange,
  handlePastQueryClick,
}) => {
  const hasResultsOrPastQueries = results.length > 0 || pastQueries.length > 0;
  return hasResultsOrPastQueries ? (
    <>
      <ResultsHeader />
      <ResultsBox>
        <Box width={'25%'}>
          <PastQueries
            pastQueries={pastQueries}
            handlePastQueryClick={handlePastQueryClick}
          />
        </Box>
        <Divider orientation='vertical' flexItem />
        <Box mt={3} flex={1}>
          <ResultsList results={results} query={query} loading={loading} />
          <Box height='calc(100% - 60px)'>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </Box>
        </Box>
      </ResultsBox>
    </>
  ) : (
    <NoResultsBox>
      <Typography color='textSecondary' style={{ opacity: 0.5 }} variant='h6'>
        No Search Results
      </Typography>
    </NoResultsBox>
  );
};

export default SearchContainer;
