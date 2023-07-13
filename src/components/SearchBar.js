import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import FoodContext from '../contexts/FoodContext';
import FetchMeals from '../funcs/FetchMeals';
import FetchDrinks from '../funcs/FetchDrinks';
import FirstRecipes from './FirstRecipes';

function SearchBar({ food }) {
  const errorMessage = 'Sorry, we haven\'t found any recipes for these filters.';

  const store = useContext(FoodContext);
  const { setSearchType, searchInput, searchType, searchResults } = store;

  const doFetch = async () => {
    if (searchInput.length > 1 && searchType === 'letter') {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (food === 'meals') {
      await FetchMeals(store);
    } else await FetchDrinks(store);
  };

  useMemo(() => {
    if (searchResults[food] === null) {
      global.alert(errorMessage);
    }
  }, [searchResults]);

  return (
    <div>
      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        Busca por ingrediente
      </label>
      <label htmlFor="name-search-radio">
        <input
          type="radio"
          id="name-search-radio"
          data-testid="name-search-radio"
          onChange={ ({ target }) => setSearchType(target.value) }
          value="name"
        />
      </label>
      Busca por nome
      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          onChange={ ({ target }) => setSearchType(target.value) }
          value="letter"
        />
      </label>
      Busca pela primeira letra
      <button
        data-testid="exec-search-btn"
        onClick={ () => doFetch() }
      >
        Buscar
      </button>
      { searchResults && <FirstRecipes foodType={ food } /> }
    </div>
  );
}

SearchBar.propTypes = {
  food: PropTypes.string.isRequired,
};

export default SearchBar;
