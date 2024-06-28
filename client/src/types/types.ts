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
 onPastQueryClick: (pastQuery: string) => void;
};

export type SearchFormProps = {
 query: string;
 onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 onSubmit: (e: React.FormEvent) => void;
};

export type SearchState = {
 results: Array<{ title: string; url: string }>;
 pastQueries: string[];
};

export type TODO = any;