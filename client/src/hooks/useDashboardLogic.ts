import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addSearchQuery } from '../store/slices/searchSlice';
import {
  fetchSearchResults,
  fetchPastQueries,
} from '../store/actions/searchActions';
import useDebounce from './useDebounce';
import { selectPaginatedResults } from '../store/selectors/index';

const useDashboardLogic = () => {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(state => state.search.searchResults);
  const pastQueries = useAppSelector(state => state.search.pastQueries);

  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
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
        dispatch(fetchSearchResults(query));
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
      dispatch(fetchSearchResults(pastQuery));
      setCurrentPage(1);
    },
    [dispatch]
  );

  return {
    query,
    setQuery,
    currentPage,
    setCurrentPage,
    resultsPerPage,
    paginatedResults,
    debouncedQuery,
    searchResults,
    pastQueries,
    handleInputChange,
    handleSubmit,
    handlePastQueryClick,
  };
};

export default useDashboardLogic;