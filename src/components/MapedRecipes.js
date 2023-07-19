// MAP DE RECEITAS

import { Link } from 'react-router-dom';
import { getRecipePath } from '../funcs/getRecipePath';

export default function MapedRecipes({ recipe }) {
  const { pathname } = window.location;

  return (
    recipe.map((info, index) => (
      <Link
      // link retorna undefined error
        to={ getRecipePath(recipe, pathname) }
        key={ info.idMeal || info.idDrink }
        className="recipe-card-link"
        data-testid={ `${index}-recipe-card` }
      >
        <img
          src={ info.strMealThumb || info.strDrinkThumb }
          alt={ info.strMeal || info.strDrink }
          className="info-img"
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>
          {info.strMeal || info.strDrink}
        </p>
      </Link>
    ))
  );
}
