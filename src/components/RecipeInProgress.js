import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { renderIngredientsHasChecklist } from '../funcs/renderIngredients';
import FoodContext from '../contexts/FoodContext';

/* Preciso descobrir como renderizar a página em recipesDetails...
É preciso diminuir a complexidade de recipesDetails
ideia: mudar tudo para um componente de detalhes. Ou quebrar para mudar apenas a instrução.
*/

const copy = require('clipboard-copy');

const copyMessage = 'Link copied!';

function RecipeInProgress() {
  const [apiData, setApiData] = useState([]);
  const [wasCopy, setWasCopy] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { ingredientList, setIngredientList } = useContext(FoodContext);

  const id = window.location.pathname.replace(/^\/[^/]+\//, '').split('/');
  const path = window.location.pathname.split('/')[1];

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

  const checkList = document.querySelectorAll('.ingredientCheck');
  // const checkValue = checkList && checkList.map(({ value }) => value);
  // console.log(checkList);
  // console.log(checkValue);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setIngredientList((prevIngredientList) => [...prevIngredientList, value]);
    } else {
      setIngredientList((prevIngredientList) => prevIngredientList.filter((ingredient) => ingredient !== value));
    }
  };

  console.log(ingredientList);

  useEffect(() => {
    if (path === 'meals') {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id[0]}`)
        .then((r) => r.json())
        .then((data) => setApiData(data[path]));
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id[0]}`)
        .then((r) => r.json())
        .then((data) => setApiData(data[path]));
    }
  }, [id, path]);

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
                  copy(`http:localhost:3000/${foodType}/${info.idMeal
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
            {renderIngredientsHasChecklist(info)}

            {/*
            {
      <div>
      <label htmlFor={ ingredientName }>
        <input
          type="checkbox"
          key={ i }
          data-testid={ `${i - 1}-ingredient-name-and-measure` }
          value={ ingredientName }
          id={ ingredientName }
          className="ingredientCheck"
          onChange={ handleCheckboxChange }
        />
        { `${ingredientName} - ${ingredientMeasure}` }
      </label>
    </div>            } */}
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
          <Link
            to={ `/${path}/${info.idMeal
               || info.idDrink}/in-progress` }
          >
            <button
              className="defaultBtn"
              data-testid="start-recipe-btn"
              disabled={ disabled }
              onClick={ () => setInProgress(false) }
            >
              Finish Recipe
            </button>
          </Link>
        </section>
      </main>
    ))

  );
}

export default RecipeInProgress;
