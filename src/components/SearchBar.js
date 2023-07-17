import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import FoodContext from '../contexts/FoodContext';
import FetchMeals from '../funcs/FetchMeals';
import FetchDrinks from '../funcs/FetchDrinks';
import FirstRecipes from './FirstRecipes';
import RecomendedRecipes from './RecomendedRecipes';

function SearchBar({ food, searchBar }) {
  const errorMessage = 'Sorry, we haven\'t found any recipes for these filters.';

  const store = useContext(FoodContext);
  const {
    setSearchType,
    setSearchInput,
    searchInput,
    searchType,
    searchResults } = store;

  useMemo(() => {
    if (searchResults[food] === null) {
      global.alert(errorMessage);
    }
  }, [searchResults, food]);

  const doFetch = async () => {
    if (searchInput.length > 1 && searchType === 'letter') {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (food === 'meals') {
      await FetchMeals(store);
    } else await FetchDrinks(store);
  };

  return (
    <section className={ `page-container search-container-${searchBar}` }>
      <input
        type="text"
        className="search-input"
        data-testid="search-input"
        onChange={ ({ target }) => setSearchInput(target.value) }
        value={ searchInput }
        placeholder="Search"
      />
      <form>
        <div className="input-wrapper">
          <label htmlFor="ingredient-search-radio">
            <input
              type="radio"
              id="ingredient-search-radio"
              data-testid="ingredient-search-radio"
              value="ingredient"
              onChange={ ({ target }) => setSearchType(target.value) }
            />
            Ingrediente
          </label>
        </div>

        <div className="input-wrapper">
          <label htmlFor="name-search-radio">
            <input
              type="radio"
              id="name-search-radio"
              data-testid="name-search-radio"
              onChange={ ({ target }) => setSearchType(target.value) }
              value="name"
            />
            Nome
          </label>
        </div>

        <div className="input-wrapper">
          <label htmlFor="first-letter-search-radio">
            <input
              type="radio"
              id="first-letter-search-radio"
              data-testid="first-letter-search-radio"
              onChange={ ({ target }) => setSearchType(target.value) }
              value="letter"
            />
            Primeira letra
          </label>
        </div>
      </form>
      <button
        data-testid="exec-search-btn"
        onClick={ () => doFetch() }
        className="defaultBtn"
      >
        Buscar
      </button>
      <RecomendedRecipes foodType={ food } />
      { searchResults && <FirstRecipes foodType={ food } /> }
    </section>
  );
}

SearchBar.propTypes = {
  food: PropTypes.string.isRequired,
  searchBar: PropTypes.bool.isRequired,
};

export default SearchBar;
