import { Box, Typography, Divider, Skeleton } from '@mui/material';
import { t } from 'i18next';
import useResponsive from '../../hooks/useResponsive';
import { useAppSelector } from '../../store/store';
import Pagination from '../Pagination/Pagination';
import PastQueries from '../PastQueries/PastQueries';
import ResultsHeader from './ResultsHeader';
import ResultsList from './ResultsList';
import { ResultsBox, NoResultsBox } from '../common/StyledComponents';
import { SearchContainerProps } from '../../types/types';

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
  const { isMobile } = useResponsive();

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
          <Box
            width={isMobile ? '100%' : '25%'}
            maxHeight={isMobile ? 200 : 'inherit'}
            sx={{ overflowY: isMobile ? 'auto' : 'inherit' }}
            borderBottom={isMobile ? '1px solid #E9EAEB' : 'none'}
          >
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
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </Box>
      </ResultsBox>
    </>
  );
};

export default SearchContainer;
