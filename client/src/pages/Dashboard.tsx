import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { fetchSearchResults, addSearchQuery, fetchPastQueries } from '../store/slices/searchSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import SearchForm from '../components/SearchForm';
import PastQueries from '../components/PastQueries';
import SearchResults from '../components/SearchResults';
import Pagination from '../components/Pagination';
import { Container, Box, Grid, Paper, Typography } from '@mui/material';
import { TODO } from '../types/types';
import useDebounce from '../hooks/useDebounce';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(state => state.search.results);
  const pastQueries = useAppSelector(state => state.search.pastQueries);

  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    dispatch(fetchPastQueries());
  }, [dispatch]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(addSearchQuery(query));
      dispatch(fetchSearchResults(query) as TODO);
      setCurrentPage(1);
    } else {
      console.log('No query to submit');
    }
  }, [query, dispatch]);

  const handlePastQueryClick = useCallback((pastQuery: string) => {
    setQuery(pastQuery);
    dispatch(fetchSearchResults(pastQuery) as TODO);
    setCurrentPage(1);
  }, [dispatch]);

  const paginatedResults = useMemo(() => 
    searchResults.slice(
      (currentPage - 1) * resultsPerPage,
      currentPage * resultsPerPage
    ), 
    [searchResults, currentPage, resultsPerPage]
  );

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          The search engine you've been looking for
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          All-in-one lightning-fast setup and unprecedented control.
        </Typography>
        <Paper sx={{ p: 2, mb: 4 }}>
          <SearchForm query={query} onInputChange={handleInputChange} onSubmit={handleSubmit} />
        </Paper>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper sx={{ p: 2 }}>
              <PastQueries pastQueries={pastQueries} onPastQueryClick={handlePastQueryClick} />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <SearchResults results={paginatedResults} query={debouncedQuery} loading={false} />
          </Grid>
        </Grid>
        <Pagination
          totalResults={searchResults.length}
          resultsPerPage={resultsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </Box>
    </Container>
  );
};

export default Dashboard;