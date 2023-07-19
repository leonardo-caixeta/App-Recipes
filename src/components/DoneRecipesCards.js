import React, { useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import FoodContext from '../contexts/FoodContext';
import { getRecipeDonePath } from '../funcs/getRecipePath';

function DoneRecipesCards() {
  const { recipeType } = useContext(FoodContext);
  // Valores mock para construção do componente
  const meals = [
    {
      idMeal: '52771',
      type: 'meal',
      strArea: 'Italian',
      strCategory: 'Vegetarian',
      alcoholicOrNot: '',
      strMeal: 'Spicy Arrabiata Penne',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      strTags: ['Pasta', 'Curry'],
    },
    {
      idDrink: '178319',
      type: 'drink',
      strArea: '',
      strCategory: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      strDrink: 'Aquamarine',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      strTags: [],
    },
  ];
  localStorage.setItem('doneRecipes', JSON.stringify(meals));

  // Biblioteca toastfy para notificações
  const notify = () => (
    toast.success('Link copied!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
    })
  );

  const handleShareBtn = () => {
    notify();
  };

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <>
      {
        doneRecipes
          .map((food, index) => (
            <section key={ food.idMeal || food.idDrink }>
              <Link to={ getRecipeDonePath(food) }>
                <img
                  className="recipe-img"
                  alt={ food.strMeal || food.strDrink }
                  src={ food.strMealThumb || food.strDrinkThumb }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <div>
                <Link to={ getRecipeDonePath(food) }>
                  <h2 data-testid={ `${index}-horizontal-name` }>
                    {food.strMeal || food.strDrink}
                  </h2>
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { food.strMeal
                    ? `${food.strArea}  -  ${food.strCategory}` : 'Alcoholic'}
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>{food.doneDate}</p>
                <ul>
                  {
                    food.strTags && food.strTags.map((tag) => (
                      <li
                        key={ `${index}-${tag}` }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div>
                <button
                  id={ [food.idMeal || food.idDrink, recipeType] }
                  onClick={ handleShareBtn }
                >
                  <img
                    src={ shareIcon }
                    alt="Compartilhar"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                <ToastContainer
                  position="top-right"
                  autoClose={ 2000 }
                  closeOnClick
                  pauseOnHover
                />
              </div>
            </section>
          ))
      }
    </>
  );
}

export default DoneRecipesCards;
