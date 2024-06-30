import { Box, Typography, Divider, Skeleton } from '@mui/material';
import Pagination from '../Pagination/Pagination';
import PastQueries from '../PastQueries/PastQueries';
import { ResultsBox, NoResultsBox } from '../common/StyledComponents';
import ResultsHeader from './ResultsHeader';
import ResultsList from './ResultsList';
import { SearchContainerProps } from '../../types/types';
import { useAppSelector } from '../../store/store';
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
  handleClearQueries,
}: SearchContainerProps) => {
  const isClearHistoryLoading = useAppSelector(
    state => state.search.isClearHistoryLoading
  );
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
        {isClearHistoryLoading ? (
          <Skeleton variant='rounded' height='100%' width='100%' />
        ) : (
          <Box width={'25%'} minHeight={200}>
            <PastQueries
              pastQueries={pastQueries}
              handlePastQueryClick={handlePastQueryClick}
              handleClearQueries={handleClearQueries}
            />
          </Box>
        )}
        <Divider orientation='vertical' flexItem />
        <Box mt={3} flex={1} sx={{ transition: 'height 0.3s ease' }}>
          <ResultsList results={results} query={query} isLoading={isLoading} />
          <Box  sx={{ transition: 'height 0.3s ease' }}>
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
