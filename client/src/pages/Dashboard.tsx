import React, { useEffect, useState, useCallback } from 'react';
import { addSearchQuery } from '../store/slices/searchSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  fetchSearchResults,
  fetchPastQueries,
} from '../store/actions/searchActions';
import DrawerComponent from '../components/Drawer';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import Pagination from '../components/Pagination';
import { Container, Box, Button, Grid, Paper, Typography } from '@mui/material';
import { TODO } from '../types/types';
import useDebounce from '../hooks/useDebounce';
import { selectPaginatedResults } from '../store/selectors/index';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(state => state.search.searchResults);
  const pastQueries = useAppSelector(state => state.search.pastQueries);

  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const resultsPerPage = 5;

  const paginatedResults = useAppSelector(state =>
    selectPaginatedResults(state, currentPage, resultsPerPage)
  );

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    dispatch(fetchPastQueries());
  }, [dispatch]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        dispatch(addSearchQuery(query));
        dispatch(fetchSearchResults(query) as TODO);
        setCurrentPage(1);
      } else {
        console.log('No query to submit');
      }
    },
    [query, dispatch]
  );

  const handlePastQueryClick = useCallback(
    (pastQuery: string) => {
      setQuery(pastQuery);
      dispatch(fetchSearchResults(pastQuery) as TODO);
      setCurrentPage(1);
    },
    [dispatch]
  );

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Container maxWidth='lg'>
      <Typography mt={6} variant='h4' align='center' gutterBottom>
        The search engine you've been looking for
      </Typography>
      <Typography variant='subtitle1' align='center'>
        All-in-one lightning-fast setup and unprecedented control.
      </Typography>
      <Box
        mt={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth='lg'>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <DrawerComponent
                drawerOpen={drawerOpen}
                toggleDrawer={toggleDrawer}
                pastQueries={pastQueries}
                handlePastQueryClick={handlePastQueryClick}
              />
            </Grid>

            <Grid item xs={12} md={9}>
              <Button
                onClick={toggleDrawer}
                sx={{
                  ml: drawerOpen ? '15%' : '0',
                  transition: 'margin-left 0.3s',
                  position: 'fixed',
                  top: '16px',
                  left: '16px',
                }}
              >
                {drawerOpen ? '<' : '>'}
              </Button>
              <Paper sx={{ p: 2, mb: 3 }}>
                <SearchForm
                  query={query}
                  onInputChange={handleInputChange}
                  onSubmit={handleSubmit}
                />
              </Paper>
              <SearchResults
                results={paginatedResults}
                query={debouncedQuery}
                loading={false}
              />
              <Box mt={3}>
                <Pagination
                  totalResults={searchResults.length}
                  resultsPerPage={resultsPerPage}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
};

export default Dashboard;
