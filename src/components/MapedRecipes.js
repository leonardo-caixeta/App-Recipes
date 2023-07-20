// MAP DE RECEITAS

import { Link, useLocation } from 'react-router-dom';

export default function MapedRecipes({ recipe }) {
  const { pathname } = useLocation();

  return (
    recipe.map((info, index) => (
      <Link
        to={ `${pathname}/${info.idMeal || info.idDrink}` }
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
