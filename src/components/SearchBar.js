import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
        />
        Busca por ingrediente
      </label>
      <label htmlFor="name-search-radio">
        <input
          type="radio"
          id="name-search-radio"
          data-testid="name-search-radio"
        />
      </label>
      Busca por nome
      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
        />
      </label>
      Busca pela primeira letra
      <button data-testid="exec-search-btn">
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
