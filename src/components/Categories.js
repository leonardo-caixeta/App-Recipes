// CATEGORIAS PARA FILTRAR RECEITAS

import React, { useContext, useState } from 'react';
import FoodContext from '../contexts/FoodContext';
import { fetchFilterCategories } from '../helper/api';
import MapedRecipes from './MapedRecipes';

const magicNumber = 12;

function Categories() {
  const {
    categories,
    toggleRenderFiltered,
    setToggleRenderFiltered,
    toggleRenderRecomended,
    setToggleRenderRecomended } = useContext(FoodContext);
  const [filterCategories, setFilterCategories] = useState();

  const path = window.location.pathname.replace(/\//g, '');

  const doFetch = async (category) => {
    setToggleRenderFiltered(!toggleRenderFiltered);
    setToggleRenderRecomended(true);
    if (path === 'meals') {
      setFilterCategories(await fetchFilterCategories(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`));
    } else {
      setFilterCategories(await fetchFilterCategories(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`));
    }
  };

  return (
    <div className="category-buttons-container">
      {categories.map((category, index) => (
        <button
          key={ index }
          data-testid={ `${category.strCategory}-category-filter` }
          className="category-button"
          onClick={ () => doFetch(category.strCategory) }
        >
          {category.strCategory}
        </button>
      ))}
      {
        (filterCategories && toggleRenderFiltered && toggleRenderRecomended)
            && (<MapedRecipes
              recipe={ filterCategories[path]
                .slice(0, magicNumber) }
            />)
      }
      <button
        className="category-button"
        onClick={ () => setToggleRenderFiltered(false) }
        data-testid="All-category-filter"
      >
        All
      </button>
    </div>
  );
}

export default Categories;
