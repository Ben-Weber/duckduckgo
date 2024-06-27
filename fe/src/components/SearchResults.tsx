import React from 'react';
import { Box, Typography, Link, Paper, Skeleton } from '@mui/material';

interface SearchResult {
  title: string;
  description: string;
  url: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  loading: boolean;
}

const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

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

const countOccurrences = (text: string, term: string) => {
  if (!term || !text) return 0;
  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escapedTerm, 'gi');
  return (text.match(regex) || []).length;
};

const SearchResults: React.FC<SearchResultsProps> = ({ results, query, loading }) => (
  <Box>
    {loading ? (
      <Skeleton variant="rectangular" width="100%" height={118} />
    ) : (
      results.map((result, index) => (
        <Paper key={index} elevation={2} sx={{ p: 2, mb: 2 }}>
          <Link href={result.url} variant="h6" underline="hover">
            {highlightTerm(result.title, query)}
          </Link>
          <Typography variant="body2">{highlightTerm(result.description, query)}</Typography>
          {countOccurrences(result.title, query) > 0 && (
            <Typography variant="caption">{`"${query}" appears ${countOccurrences(result.title, query)} times`}</Typography>
          )}
        </Paper>
      ))
    )}
  </Box>
);

export default SearchResults;
