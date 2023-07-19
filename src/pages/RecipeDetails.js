// TELA DE DETALHES

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecomendedRecipes from '../components/RecomendedRecipes';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const magicNumber = 20;
const secondMagicNumber = -1;

const copy = require('clipboard-copy');

const copyMessage = 'Link copied!';

const inProgressRecipes = {
  drinks: {
    idDaBebida: 'lista-de-ingredientes-utilizados',
  },
  meals: {
    idDaComida: 'lista-de-ingredientes-utilizados',
  },
};

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

export default function RecipeDetails({ foodType }) {
  const [wasCopy, setWasCopy] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(false);

  function renderIngredients(info) {
    const ingredients = [];

    for (let i = 1; i <= magicNumber; i += 1) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;

      if (info[ingredientKey] && info[measureKey]) {
        const ingredientName = info[ingredientKey];
        const ingredientMeasure = info[measureKey];
        ingredients.push(
          <li key={ i } data-testid={ `${i - 1}-ingredient-name-and-measure` }>
            { `${ingredientName} - ${ingredientMeasure}` }
          </li>,
        );
      }
    }

    return ingredients;
  }

  const handleFavoriteIcon = () => {
    const favoriteHeart = JSON.parse(localStorage.getItem('favoriteHeart'));
    setFavoriteIcon(favoriteHeart);
  };

  const favoriteRecipe = (informations) => {
    localStorage.setItem('favoriteHeart', JSON.stringify(!favoriteIcon));

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const favoriteIDs = favorites.map((data) => data.id);
    const conditional = favoriteIDs
      .includes(String(informations.idDrink || informations.idMeal));

    if (favorites.lenght > 1 || !conditional) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, {
        id: informations.idDrink || informations.idMeal,
        type: foodType.slice(0, secondMagicNumber),
        nationality: informations.strArea || '',
        category: informations.strCategory || '',
        alcoholicOrNot: informations.strAlcoholic || '',
        name: informations.strDrink || informations.strMeal,
        image: informations.strMealThumb || informations.strDrinkThumb,
      }]));
    }
    handleFavoriteIcon();
  };
  console.log(!favoriteIcon);

  const [apiData, setApiData] = useState([]);

  const id = window.location.pathname.replace(/^\/[^/]+\//, '');
  const path = window.location.pathname.split('/')[1];

  useEffect(() => {
    if (path === 'meals') {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((r) => r.json())
        .then((data) => setApiData(data[path]));
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((r) => r.json())
        .then((data) => setApiData(data[path]));
    }
  }, [id, path]);

  useEffect(() => {
    handleFavoriteIcon();
  }, []);

  return (
    apiData && apiData.map((info, index) => (
      <main key={ index } className="recipes-details-container">
        <header>
          <img
            src={ info.strMealThumb || info.strDrinkThumb }
            alt={ info.strMeal || info.strDrink }
            data-testid="recipe-photo"
            className="recipe-photo"
          />
          <div>
            <p
              data-testid="recipe-category"
              className="recipe-category"
            >
              { info.strAlcoholic || info.strCategory }

            </p>
            <section className="utilsBtns-container">
              <input
                type="image"
                alt="share-icon"
                data-testid="share-btn"
                id="share-btn"
                className="utilsBtns"
                src={ shareIcon }
                onClick={ () => {
                  copy(`http://localhost:3000/${foodType}/${info.idMeal
                    || info.idDrink}`);
                  setWasCopy(true);
                } }
              />
              {
                wasCopy && <p>{ copyMessage }</p>
              }
              <input
                type="image"
                data-testid="favorite-btn"
                id="favorite-btn"
                className="utilsBtns"
                alt="favorite-icon"
                src={ favoriteIcon ? blackHeart : whiteHeart }
                onClick={ () => favoriteRecipe(info) }
              />
            </section>
            <h2 data-testid="recipe-title">{info.strMeal || info.strDrink}</h2>
          </div>
        </header>
        <section className="instructions-container">
          <h3>Ingredients:</h3>
          <section
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {
              renderIngredients(info)
            }
          </section>
          <h3>Instructions:</h3>
          <section>
            <p data-testid="instructions">{info.strInstructions}</p>
          </section>
          <h3>Video:</h3>
          <section>
            <video
              src={ info.strYoutube }
              data-testid="video"
            >
              <track src="" kind="captions" srcLang="en" label="English" default />
            </video>
          </section>
          <h3>Recomended:</h3>
          <section className="recomended-container">
            <RecomendedRecipes path={ path } />
          </section>
          {
            doneRecipes && (
              <Link
                to={ `/${foodType}/${info.idMeal
                  || info.idDrink}/in-progress` }
              >
                <button
                  className="defaultBtn"
                  data-testid="start-recipe-btn"
                >
                  {
                    inProgressRecipes ? 'Continue Recipes' : 'Start Recipe'
                  }
                </button>
              </Link>
            )
          }
        </section>
      </main>
    ))

  );
}
