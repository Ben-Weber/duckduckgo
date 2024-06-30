import React from 'react';
import { Container, Box } from '@mui/material';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import useDashboardLogic from '../hooks/useDashboardLogic';
import Header from '../components/Header';

const Dashboard: React.FC = () => {
  const {
    query,
    currentPage,
    resultsPerPage,
    paginatedResults,
    debouncedQuery,
    searchResults,
    pastQueries,
    handleInputChange,
    handleSubmit,
    handlePastQueryClick,
    setCurrentPage,
  } = useDashboardLogic();

  return (
    <Container maxWidth='lg'>
      <Header />
      <Box pt={6} width={900} margin='0 auto'>
        <Container maxWidth='lg'>
          <SearchForm
            query={query}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
          <SearchResults
            results={paginatedResults}
            query={debouncedQuery}
            loading={false}
            totalResults={searchResults.length}
            resultsPerPage={resultsPerPage}
            currentPage={currentPage}
            pastQueries={pastQueries}
            onPageChange={setCurrentPage}
            handlePastQueryClick={handlePastQueryClick}
          />
        </Container>
      </Box>
    </Container>
  );
};

export default Dashboard;
