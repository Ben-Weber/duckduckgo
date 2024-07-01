import { MouseEvent, useCallback } from 'react';
import { Container, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useDashboardLogic from '../hooks/useDashboardLogic';
import SearchForm from '../components/Search/SearchForm';
import SearchResults from '../components/Search/SearchResults';
import Header from '../components/Header/Header';
import LanguageToggle from '../components/LanguageToggle/LanguageToggle';

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
  const { i18n } = useTranslation();

  const handleLanguageChange = useCallback(
    (event: MouseEvent<HTMLElement>, newLang: string) => {
      if (newLang !== null) {
        i18n.changeLanguage(newLang);
      }
    },
    [i18n]
  );

  return (
    <Container maxWidth='lg'>
      <LanguageToggle handleLanguageChange={handleLanguageChange} />
      <Header />
      <Box>
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
