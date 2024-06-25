import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults, addSearchQuery } from '../slices/searchSlice';
import { RootState } from '../store';
import { TODO } from '../types/global';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const pastQueries = useSelector((state: RootState) => state.search.pastQueries);

  const [query, setQuery] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(addSearchQuery(query));
      dispatch(fetchSearchResults(query) as TODO);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>

      <div className="past-queries">
        <h3>Past Queries</h3>
        <ul>
          {pastQueries.map((pastQuery, index) => (
            <li key={index} onClick={() => console.log(pastQuery)}>
              {pastQuery}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;