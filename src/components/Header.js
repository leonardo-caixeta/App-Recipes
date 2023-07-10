import { Link } from 'react-router-dom';
import { useState } from 'react';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ haveSearch, title }) {
  const [searchBar, setSearchBar] = useState(false);
  const showSearchBar = () => (
    searchBar === false ? setSearchBar(true) : setSearchBar(false)
  );
  return (
    <div>
      <Link to="/profile">
        <img
          src={ profileIcon }
          alt="profile-icon"
          data-testid="profile-top-btn"
        />
      </Link>

      { haveSearch
        && (
          <label htmlFor="search-top-btn">
            <input
              type="image"
              src={ searchIcon }
              alt="search-icon"
              data-testid="search-top-btn"
              id="search-top-btn"
              onClick={ showSearchBar }
            />
          </label>
        )}
      <h1 data-testid="page-title">{ title }</h1>
      {
        searchBar
        && (
          <input
            type="text"
            data-testid="search-input"
          />
        )
      }
    </div>
  );
}
