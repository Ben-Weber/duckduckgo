import React from 'react';
import { Link, Paper, Typography } from '@mui/material';
import { countOccurrences, escapeRegExp } from '../utils/tools';
import { SearchResultItemProps } from '../types/types';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)({
  padding: 16,
  marginBottom: 16,
});

const highlightTerm = (text: string, term: string) => {
  if (!term || !text) return text;
  const escapedTerm = escapeRegExp(term);
  const parts = text.split(new RegExp(`(${escapedTerm})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === term.toLowerCase() ? (
          <span key={i} style={{ backgroundColor: 'yellow' }}>{part}</span>
        ) : (
          part
        )
      )}
    </span>
  );
};

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result, query }) => {
  const occurrenceCount = countOccurrences(result.title, query);
  return (
    <StyledPaper elevation={2}>
      <Link href={result.url} variant="h6" underline="hover">
        {highlightTerm(result.title, query)}
      </Link>
      {occurrenceCount > 0 && (
        <Typography variant="caption">{`"${query}" appears ${occurrenceCount} times`}</Typography>
      )}
    </StyledPaper>
  );
};

export default SearchResultItem;