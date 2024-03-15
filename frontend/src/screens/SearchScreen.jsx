import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSearchResults } from '../actions/questionActions';

const SearchScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q');
    setSearchTerm(q);
    if (q) {
      dispatch(fetchSearchResults(q)); // Dispatching action with search term
    }
  }, [dispatch, location.search]);

  // useSelector to get search results from Redux store
  const searchResults = useSelector((state) => state.search);
  const { loading, error, results } = searchResults;

  return (
    <div>
      <h2>Search Results for: {searchTerm}</h2>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          results.map((result) => (
            <div key={result.id}>
              <p>{result.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
