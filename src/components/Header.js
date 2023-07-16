import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import doneIcon from '../images/doneIcon.svg';
import favoritesIcon from '../images/favoritesIcon.svg';
import headerIcon from '../images/headerRecipesAppIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ haveSearch, title }) {
  const [searchBar, setSearchBar] = useState(false);

  const [imgUrl, setImgUrl] = useState('');

  const showSearchBar = () => (
    searchBar === false ? setSearchBar(true) : setSearchBar(false)
  );

  useEffect(() => {
    switch (title) {
    case 'Meals':
      setImgUrl(mealIcon);
      break;
    case 'Drinks':
      setImgUrl(drinkIcon);
      break;
    case 'Profile':
      setImgUrl(profileIcon);
      break;
    case 'Favorites':
      setImgUrl(favoritesIcon);
      break;
    case 'Done Recipes':
      setImgUrl(doneIcon);
      break;

    default:
      break;
    }
  }, [title]);

  return (
    <section className="header-container">
      <header>
        <div className="logo-container">
          <img alt="Logo App de Receitas" src={ headerIcon } />
          <p>
            RECIPES
            <span>app</span>
          </p>
        </div>
        <nav>
          <Link to="/profile">
            <img
              src={ profileIcon }
              alt="profile-icon"
              data-testid="profile-top-btn"
              className="header-icon"
            />
          </Link>

          { haveSearch
        && (
          <label htmlFor="search-top-btn">
            <input
              className="header-icon"
              type="image"
              src={ searchIcon }
              alt="search-icon"
              data-testid="search-top-btn"
              id="search-top-btn"
              onClick={ showSearchBar }
            />
          </label>
        )}
        </nav>
      </header>
      <img className="page-Icon" alt={ `Ícone da página de ${title}` } src={ imgUrl } />
      <h1 className="page-title" data-testid="page-title">{ title }</h1>
      {
        searchBar
        && (
          <SearchBar />
        )
      }
    </section>
  );
}

Header.propTypes = {
  haveSearch: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
