import React from 'react';
import { Box, Link, Paper, Typography } from '@mui/material';
import { countOccurrences, pluralize, highlightTerm } from '../utils/tools';
import { SearchResultItemProps } from '../types/types';
import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';
import { t } from 'i18next';

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

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  result,
  query,
}) => {
  const occurrenceCount = countOccurrences(result.title, query);
  return (
    <StyledPaper elevation={2}>
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
              label={query}
              color='success'
              size='small'
            />
            <Typography variant='caption'>
              {formatOccurrenceText(occurrenceCount)}
            </Typography>
          </>
        )}
      </Box>
    </StyledPaper>
  );
};

export default SearchResultItem;
