// TELA DE DETALHES

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecomendedRecipes from './RecomendedRecipes';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import { IngredentsList } from './IngredentsList';

const secondMagicNumber = -1;

const copy = require('clipboard-copy');

const copyMessage = 'Link copied!';

// futuramente vem do localStorage

export default function Details({ foodType, info, index }) {
  console.log(info);

  const [wasCopy, setWasCopy] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(false);

  const location = useLocation();
  const path = location.pathname.split('/')[1];

  // function renderIngredients(data) {
  //   const ingredients = [];

  //   for (let i = 1; i <= magicNumber; i += 1) {
  //     const ingredientKey = `strIngredient${i}`;
  //     const measureKey = `strMeasure${i}`;

  //     if (data[ingredientKey] && data[measureKey]) {
  //       const ingredientName = data[ingredientKey];
  //       const ingredientMeasure = data[measureKey];
  //       ingredients.push(
  //         <li key={ i } data-testid={ `${i - 1}-ingredient-name-and-measure` }>
  //           { `${ingredientName} - ${ingredientMeasure}` }
  //         </li>,
  //       );
  //     }
  //   }

  //   return ingredients;
  // }

  const handleFavoriteIcon = () => {
    const favoriteHeart = JSON.parse(localStorage.getItem('favoriteHeart'));
    setFavoriteIcon(favoriteHeart);
  };

  const favoriteRecipe = (informations) => {
    localStorage.setItem('favoriteHeart', JSON.stringify(!favoriteIcon));

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const favoriteIDs = favorites.map((data) => data.id);
    // Checa se o item já existe na lista de favoritos
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

  return (
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
          <IngredentsList info={ info } index={ index } />
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

      </section>
    </main>
  );
}

Details.propTypes = {
  index: PropTypes.number.isRequired,
  info: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strMeal: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
  }).isRequired,
  foodType: PropTypes.string.isRequired,
};
