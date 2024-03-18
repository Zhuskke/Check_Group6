import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useSelector, useDispatch } from 'react-redux';
import { fetchSearchResults } from '../actions/questionActions';
import HeaderUser from '../components/HeaderUser';

const SearchScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q');
    setSearchTerm(q);
    if (q) {
      dispatch(fetchSearchResults(q));
    }
  }, [dispatch, location.search]);

  const searchResults = useSelector((state) => state.search);
  const { loading, error, results } = searchResults;

  return (
    <>
      <HeaderUser/>
      <div>
        <h2>Search Results for: {searchTerm}</h2>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            results.map((result) => (
              // Wrap each result in a Link to its detail view
              <div key={result.id}>
                <Link to={`/questions/${result.id}`}>
                  <p>{result.content}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default SearchScreen;
