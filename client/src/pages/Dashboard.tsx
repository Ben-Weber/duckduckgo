import { Container, Box } from '@mui/material';
import SearchForm from '../components/Search/SearchForm';
import SearchResults from '../components/Search/SearchResults';
import useDashboardLogic from '../hooks/useDashboardLogic';
import Header from '../components/Header/Header';

const Dashboard = () => {
  const {
    query,
    currentPage,
    resultsPerPage,
    paginatedResults,
    debouncedQuery,
    searchResults,
    pastQueries,
    isLoading,
    handleInputChange,
    handleSubmit,
    handlePastQueryClick,
    setCurrentPage,
    handleClearQueries,
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
            totalResults={searchResults.length}
            resultsPerPage={resultsPerPage}
            currentPage={currentPage}
            pastQueries={pastQueries}
            isLoading={isLoading}
            onPageChange={setCurrentPage}
            handlePastQueryClick={handlePastQueryClick}
            handleClearQueries={handleClearQueries}
          />
        </Container>
      </Box>
    </Container>
  );
};

export default Dashboard;
