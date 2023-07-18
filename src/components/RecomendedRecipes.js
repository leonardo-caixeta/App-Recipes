import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import FoodContext from '../contexts/FoodContext';

const magicNumber = 6;

// Vem futuramente do LocalStorage

export default function RecomendedRecipes({ path }) {
  const { recomendedFood, setRecomendedFood } = useContext(FoodContext);
  const dataUsed = recomendedFood && Object.values(recomendedFood).slice(0, magicNumber);

  useEffect(() => {
    if (path.includes('meals')) {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((r) => r.json())
        .then((data) => setRecomendedFood(data.drinks));
    }
    if (path.includes('drinks')) {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((r) => r.json())
        .then((data) => setRecomendedFood(data.meals));
    }
  }, []);

  return (
    recomendedFood && dataUsed.map((info, index) => (
      <div
        data-testid={ `${index}-recommendation-card` }
        className="recomended-card-container"
        key={ index }
      >
        <img
          className="square-img"
          alt={ info.strDrink || info.strMeal }
          src={ info.strMealThumb || info.strDrinkThumb }
        />
        <p
          data-testid={ `${index}-recommendation-title` }
        >
          {info.strDrink || info.strMeal}
        </p>
      </div>
    ))
  );
}

RecomendedRecipes.propTypes = {
  path: PropTypes.string.isRequired,
};
