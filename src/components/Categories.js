import React, { useContext, useState } from 'react';
import FoodContext from '../contexts/FoodContext';
import { fetchFilterCategories } from '../helper/api';

const magicNumber = 12;

function Categories() {
  const { categories } = useContext(FoodContext);
  const [filterCategories, setFilterCategories] = useState();

  const path = window.location.pathname.replace(/\//g, '');

  const doFetch = async (category) => {
    if (path === 'meals') {
      setFilterCategories(await fetchFilterCategories(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`));
    } else {
      setFilterCategories(await fetchFilterCategories(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`));
    }
  };

  return (
    <div className="category-buttons">
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
        filterCategories
          && (
            filterCategories[path]
              .slice(0, magicNumber)
              .map((info, index) => (
                <div
                  key={ index }
                  className="recipe-card"
                >
                  <img
                    src={ info.strMealThumb || info.strDrinkThumb }
                    alt="info"
                    className="info-img"

                  />
                  <p>
                    {info.strMeal || info.strDrink}
                  </p>
                </div>
              ))
          )
      }
    </div>
  );
}

export default Categories;
