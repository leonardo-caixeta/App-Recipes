// CATEGORIAS PARA FILTRAR RECEITAS

import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FoodContext from '../contexts/FoodContext';
import { fetchFilterCategories } from '../helper/api';
import MapedRecipes from './MapedRecipes';

const magicNumber = 12;

function Categories() {
  const { pathname } = useLocation();
  const {
    categories,
    toggleRenderFiltered,
    setToggleRenderFiltered,
    toggleRenderRecomended,
    setToggleRenderRecomended } = useContext(FoodContext);
  const [filterCategories, setFilterCategories] = useState();

  const path = pathname.replace(/\//g, '');

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
    <>
      <section className="category-buttons-container">
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
        <button
          className="category-button"
          onClick={ () => setToggleRenderFiltered(false) }
          data-testid="All-category-filter"
        >
          All
        </button>
      </section>
      {
        (filterCategories && toggleRenderFiltered && toggleRenderRecomended)
            && (
              <section className="recipes-card-container">
                <MapedRecipes
                  recipe={ filterCategories[path]
                    .slice(0, magicNumber) }
                />
              </section>
            )
      }
    </>
  );
}

export default Categories;
