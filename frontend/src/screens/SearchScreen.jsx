import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useSelector, useDispatch } from 'react-redux';
import { fetchSearchResults } from '../actions/questionActions';
import HeaderUser from '../components/HeaderUser';
import FooterProfile from '../components/FooterProfile';
import '../designs/Searchscreen.css'

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
      <div id='searchscreenbg'>
      <p id='searchscreentitle'>Search Results For: {searchTerm }</p>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            results.map((result) => (
              // Wrap each result in a Link to its detail view
              <div key={result.id} id='searchqcontainer'>
                <Link id='searchquestion' to={`/questions/${result.id}`}>
                  <p>{result.content}</p>
                </Link>
              </div>
            ))
          )}

          <div id='searchquestionimg'>
          </div>

          <div id='searchquestionimg2'>
          </div>

          <div id='searchquestionimg3'>
          </div>

          <div id='searchquestionimg4'>
          </div>

          <div id='searchquestionimg5'>
          </div>

          <div id='searchquestionimg6'>
          </div>

        </div>
      </div>
      <FooterProfile />
    </>
  );
};

export default SearchScreen;
