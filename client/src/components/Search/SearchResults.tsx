import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Pagination from '../Pagination/Pagination';
import PastQueries from '../PastQueries/PastQueries';
import { ResultsBox, NoResultsBox } from '../common/StyledComponents';
import ResultsHeader from './ResultsHeader';
import ResultsList from './ResultsList';
import { SearchContainerProps } from '../../types/types';
import { t } from 'i18next';

const SearchContainer = ({
  results,
  query,
  isLoading,
  totalResults,
  resultsPerPage,
  currentPage,
  pastQueries,
  onPageChange,
  handlePastQueryClick,
}: SearchContainerProps) => {
  const hasResultsOrPastQueries = results.length > 0 || pastQueries.length > 0;

  if (!hasResultsOrPastQueries) {
    return (
      <NoResultsBox>
        <Typography color='textSecondary' style={{ opacity: 0.5 }} variant='h6'>
          {t('searchResults.noResults')}
        </Typography>
      </NoResultsBox>
    );
  }

  return (
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
          <ResultsList results={results} query={query} isLoading={isLoading} />
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
  );
};

export default SearchContainer;
