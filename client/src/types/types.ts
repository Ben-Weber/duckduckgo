export type SearchResult = {
  title: string;
  url: string;
};

export type SearchResultItemProps = {
  result: SearchResult;
  query: string;
};

export type SearchResultsProps = {
  results: SearchResult[];
  query: string;
  loading: boolean;
};

export type PaginationProps = {
  totalResults: number;
  resultsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export type PastQueriesProps = {
  pastQueries: string[];
  handlePastQueryClick: (pastQuery: string) => void;
};

export type SearchFormProps = {
  query: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export type SearchState = {
  searchResults: SearchResult[];
  pastQueries: string[];
};

export type SearchContainerProps = SearchResultsProps &
  PaginationProps &
  PastQueriesProps;
