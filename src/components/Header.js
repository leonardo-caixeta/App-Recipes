import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import doneIcon from '../images/doneIcon.svg';
import favoritesIcon from '../images/favoritesIcon.svg';
import headerIcon from '../images/headerRecipesAppIcon.svg';
import SearchBar from './SearchBar';
import FoodContext from '../contexts/FoodContext';

export default function Header({ haveSearch, title }) {
  const { recipeType } = useContext(FoodContext);

  const [searchBar, setSearchBar] = useState(false);

  const [imgUrl, setImgUrl] = useState('');

  const showSearchBar = () => (
    searchBar === false ? setSearchBar(true) : setSearchBar(false)
  );

  useEffect(() => {
    switch (recipeType) {
    case 'meals':
      setImgUrl(mealIcon);
      break;
    case 'drinks':
      setImgUrl(drinkIcon);
      break;
    case 'profile':
      setImgUrl(profileIcon);
      break;
    case 'favorite':
      setImgUrl(favoritesIcon);
      break;
    case 'done':
      setImgUrl(doneIcon);
      break;

    default:
      break;
    }
  }, [recipeType]);

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
      <img
        className="page-Icon"
        alt={ `Ícone da página de ${recipeType}` }
        src={ imgUrl }
      />
      <h1 className="page-title" data-testid="page-title">{ title }</h1>
      {searchBar && <SearchBar food={ recipeType } /> }
    </section>
  );
}

Header.propTypes = {
  haveSearch: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
