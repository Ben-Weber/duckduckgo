import { Box, Link, Paper, Skeleton, Typography } from '@mui/material';
import { countOccurrences, pluralize, highlightTerm } from '../../utils/tools';
import { SearchResultItemProps } from '../../types/types';
import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';
import { t } from 'i18next';
import { useAppSelector } from '../../store/store';

const StyledPaper = styled(Paper)({
  padding: 16,
  marginBottom: 16,
  marginLeft: 12,
  marginRight: 12,
});

const StyledBox = styled(Box)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '580px',
});

const StyledChip = styled(Chip)({
  borderRadius: '5px',
  marginRight: '8px',
});

const formatOccurrenceText = (occurrenceCount: number) => {
  return `${t('searchResults.appears')} ${occurrenceCount} ${pluralize(
    occurrenceCount,
    t('searchResults.time'),
    t('searchResults.times')
  )}`;
};

const SearchResultItem = ({
  result,
  query,
  isLoading,
}: SearchResultItemProps) => {
  const isClearHistoryLoading = useAppSelector((state) => state.search.isClearHistoryLoading);
  const occurrenceCount = countOccurrences(result.title, query);
  return (
    <StyledPaper elevation={2}>
      {isLoading || isClearHistoryLoading ? (
        <Skeleton variant='text' width='100%' />
      ) : (
        <>
          <StyledBox>
            <Link
              href={result.url}
              underline='hover'
              target='_blank'
              rel='noopener noreferrer'
            >
              {highlightTerm(result.title, query)}
            </Link>
          </StyledBox>
          <Box mt={1}>
            {occurrenceCount > 0 && (
              <>
                <StyledChip
                  variant='outlined'
                  label={query.toUpperCase()}
                  color='success'
                  size='small'
                />
                <Typography variant='caption'>
                  {formatOccurrenceText(occurrenceCount)}
                </Typography>
              </>
            )}
          </Box>
        </>
      )}
    </StyledPaper>
  );
};

export default SearchResultItem;
