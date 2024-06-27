import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults, addSearchQuery } from '../slices/searchSlice';
import { RootState } from '../store';
import SearchForm from '../components/SearchForm';
import PastQueries from '../components/PastQueries';
import SearchResults from '../components/SearchResults';
import Pagination from '../components/Pagination';
import { Container, Box, Grid, Paper } from '@mui/material';
import { TODO } from '../types/global';
import useDebounce from '../hooks/useDebounce';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state: RootState) => state.search.results);
  const pastQueries = useSelector((state: RootState) => state.search.pastQueries);

  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const resultsPerPage = 5;

  const debouncedQuery = useDebounce(query, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(addSearchQuery(query));
      dispatch(fetchSearchResults(query) as TODO);
      setCurrentPage(1);
    } else {
      console.log('No query to submit');
    }
  };

  const handlePastQueryClick = (pastQuery: string) => {
    setQuery(pastQuery);
    dispatch(fetchSearchResults(pastQuery) as TODO);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedResults = searchResults.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Paper sx={{ p: 2 }}>
          <SearchForm query={query} onInputChange={handleInputChange} onSubmit={handleSubmit} />
        </Paper>
        <Grid container spacing={10}>
          <Grid item xs={12} md={3} sx={{ mt: '50px' }}>
            <PastQueries pastQueries={pastQueries} onPastQueryClick={handlePastQueryClick} />
          </Grid>
          <Grid item xs={12} md={9} sx={{ mt: '50px' }}>
            <SearchResults results={paginatedResults} query={debouncedQuery} loading={false} />
          </Grid>
        </Grid>
        <Pagination
          totalResults={searchResults.length}
          resultsPerPage={resultsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default Dashboard;
