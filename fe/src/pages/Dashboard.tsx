import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults, addSearchQuery } from '../slices/searchSlice';
import { RootState } from '../store';
import SearchForm from '../components/SearchForm';
import PastQueries from '../components/PastQueries';
import SearchResults from '../components/SearchResults';
import Pagination from '../components/Pagination';
import { Container, Box, Grid } from '@mui/material';
import { TODO } from '../types/global';
import useDebounce from '../hooks/useDebounce';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state: RootState) => state.search.results);
  const pastQueries = useSelector((state: RootState) => state.search.pastQueries);

  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const resultsPerPage = 10;

  const debouncedQuery = useDebounce(query, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('query', query);
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
    <Container>
      <Box my={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} style={{ minHeight: '200px' }}>
            <PastQueries pastQueries={pastQueries} onPastQueryClick={handlePastQueryClick} />
          </Grid>
          <Grid item xs={12} md={9} style={{ minHeight: '400px' }}>
            <SearchForm query={query} onInputChange={handleInputChange} onSubmit={handleSubmit} />
            <SearchResults results={paginatedResults} query={debouncedQuery} loading={false} />
            <Pagination
              totalResults={searchResults.length}
              resultsPerPage={resultsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
