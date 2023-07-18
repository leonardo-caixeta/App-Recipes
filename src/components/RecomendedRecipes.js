import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import FoodContext from '../contexts/FoodContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const magicNumber = 6;
const copyMessage = 'Link copied!';

// Vem futuramente do LocalStorage
const doneRecipes = [{
  id: 'id-da-receita',
  type: 'meal-ou-drink',
  nationality: 'nacionalidade-da-receita-ou-texto-vazio',
  category: 'categoria-da-receita-ou-texto-vazio',
  alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
  name: 'nome-da-receita',
  image: 'imagem-da-receita',
  doneDate: 'quando-a-receita-foi-concluida',
  tags: 'array-de-tags-da-receita-ou-array-vazio',
}];

const inProgressRecipes = {
  drinks: {
    idDaBebida: 'lista-de-ingredientes-utilizados',

  },
  meals: {
    idDaComida: 'lista-de-ingredientes-utilizados',
  },
};

export default function RecomendedRecipes({ path }) {
  const { recomendedFood, setRecomendedFood, recipeType } = useContext(FoodContext);
  const dataUsed = recomendedFood && Object.values(recomendedFood).slice(0, magicNumber);
  const [wasCopy, setWasCopy] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(false);

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

  const favoriteRecipe = (info) => {
    setFavoriteIcon(!favoriteIcon);
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipe')) || [];
    const favoriteIDs = favorites.map((data) => data.id);
    const conditional = !favoriteIDs.includes(String(info.idDrink || info.idMeal));

    if (favorites.lenght > 1 || conditional) {
      localStorage.setItem('favoriteRecipe', JSON.stringify([...favorites, {
        id: info.idDrink || info.idMeal,
        type: recipeType,
        nationality: info.strArea || null,
        category: info.strCategory || null,
        alcoholicOrNot: info.strAlcoholic || null,
        name: info.strDrink || info.strMeal,
        image: info.strMealThumb || info.strDrinkThumb,
      }]));
    }
  };

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
        {
          doneRecipes && (
            <Link to={ `/${recipeType}/${info.idMeal || info.idDrink}` }>
              <button
                data-testid="start-recipe-btn"
              >
                Start Recipe
              </button>
            </Link>
          )
        }
        {
          inProgressRecipes
          && <button>Continue Recipes</button>
        }
        <label htmlFor="share-btn">
          <input
            type="image"
            alt="share-icon"
            data-testid="share-btn"
            id="share-btn"
            src={ shareIcon }
            onClick={ () => {
              copy(`/${recipeType}/${info.idMeal || info.idDrink}`);
              setWasCopy(true);
            } }

          />
        </label>
        {
          wasCopy && <p>{ copyMessage }</p>
        }
        <label htmlFor="favorite-btn">
          <input
            type="image"
            data-testid="favorite-btn"
            id="favorite-btn"
            alt="favorite-icon"
            src={ favoriteIcon ? blackHeart : whiteHeart }
            onClick={ () => favoriteRecipe(info) }
          />
        </label>
      </div>
    ))
  );
}

RecomendedRecipes.propTypes = {
  path: PropTypes.string.isRequired,
};
