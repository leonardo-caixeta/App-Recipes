// import React, { useContext } from 'react';
import { useContext } from 'react';
import Categories from './Categories';
import FoodContext from '../contexts/FoodContext';

function Recipes() {
  const { recipes } = useContext(FoodContext);
  console.log(recipes);
  return (
    <div className="recipes-container">
      <Categories />
      <br />
      <br />
      {recipes.map((recipe, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
          className="recipe-card"
        >
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt="Recipe"
            data-testid={ `${index}-card-img` }
            className="recipe-img"

          />
          <p data-testid={ `${index}-card-name` }>
            {recipe.strMeal || recipe.strDrink}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
