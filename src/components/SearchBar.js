import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import FoodContext from '../contexts/FoodContext';
import FetchMeals from '../funcs/FetchMeals';
import FetchDrinks from '../funcs/FetchDrinks';
import FirstRecipes from './FirstRecipes';

function SearchBar({ food }) {
  const store = useContext(FoodContext);
  const { setSearchType } = store;
  // const { searchResults } = store;

  const doFetch = async () => {
    if (food === 'meal') {
      await FetchMeals(store);
    } else await FetchDrinks(store);
  };

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
      <FirstRecipes />
    </div>
  );
}

SearchBar.propTypes = {
  food: PropTypes.string.isRequired,
};

export default SearchBar;
