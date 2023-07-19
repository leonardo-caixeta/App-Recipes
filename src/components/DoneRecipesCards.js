import React, { useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import FoodContext from '../contexts/FoodContext';

function RecipesCards() {
  const [recipeType] = useContext(FoodContext);
  // Valores mock para construção do componente
  const meals = [
    {
      idMeal: '53069',
      strMeal: 'Bistek',
      strDrinkAlternate: null,
      strCategory: 'Beef',
      strArea: 'Filipino',
      //  strInstructions: '0.\tMarinate beef in soy sauce, lemon (or calamansi), and ground black pepper for at least 1 hour. Note: marinate overnight for best result\r\n1.\tHeat the cooking oil in a pan then pan-fry half of the onions until the texture becomes soft. Set aside\r\n2.\tDrain the marinade from the beef. Set it aside. Pan-fry the beef on the same pan where the onions were fried for 1 minute per side. Remove from the pan. Set aside\r\n3.\tAdd more oil if needed. Saute garlic and remaining raw onions until onion softens.\r\n4.\tPour the remaining marinade and water. Bring to a boil.\r\n5.\tAdd beef. Cover the pan and simmer until the meat is tender. Note: Add water as needed.\r\n6.\tSeason with ground black pepper and salt as needed. Top with pan-fried onions.\r\n7.\tTransfer to a serving plate. Serve hot. Share and Enjoy!\r\n',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/4pqimk1683207418.jpg',
      strTags: null,
      strYoutube: 'https://www.youtube.com/watch?v=xOQON5_S7as',
      strIngredient1: 'Beef',
      strIngredient2: 'Soy Sauce',
      strIngredient3: 'Lemon',
      strIngredient4: 'Garlic',
      strIngredient5: 'Onion',
      strIngredient6: 'Olive Oil',
      strIngredient7: 'Water',
      strIngredient8: 'Salt',
      strIngredient9: '',
      strIngredient10: '',
      strIngredient11: '',
      strIngredient12: '',
      strIngredient13: '',
      strIngredient14: '',
      strIngredient15: '',
      strIngredient16: '',
      strIngredient17: '',
      strIngredient18: '',
      strIngredient19: '',
      strIngredient20: '',
      strMeasure1: '1 lb',
      strMeasure2: '5 tablespoons',
      strMeasure3: '1',
      strMeasure4: '3 cloves',
      strMeasure5: '3 parts ',
      strMeasure6: '4 tbs',
      strMeasure7: '1 cup ',
      strMeasure8: '1 pinch',
      strMeasure9: ' ',
      strMeasure10: ' ',
      strMeasure11: ' ',
      strMeasure12: ' ',
      strMeasure13: ' ',
      strMeasure14: ' ',
      strMeasure15: ' ',
      strMeasure16: ' ',
      strMeasure17: ' ',
      strMeasure18: ' ',
      strMeasure19: ' ',
      strMeasure20: ' ',
      strSource: 'https://panlasangpinoy.com/bistek-tagalog-beefsteak-recipe/',
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    },
    {
      idMeal: '53070',
      strMeal: 'Beef Caldereta',
      strDrinkAlternate: null,
      strCategory: 'Beef',
      strArea: 'Filipino',
      //  strInstructions: '0.\tHeat oil in a cooking pot. Saute onion and garlic until onion softens\r\n1.\tAdd beef. Saute until the outer part turns light brown.\r\n2.\tAdd soy sauce. Pour tomato sauce and water. Let boil.\r\n3.\tAdd Knorr Beef Cube. Cover the pressure cooker. Cook for 30 minutes.\r\n4.\tPan-fry carrot and potato until it browns. Set aside.\r\n5.\tAdd chili pepper, liver spread and peanut butter. Stir.\r\n6.\tAdd bell peppers, fried potato and carrot. Cover the pot. Continue cooking for 5 to 7 minutes.\r\n7.\tSeason with salt and ground black pepper. Serve.\r\n',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/41cxjh1683207682.jpg',
      strTags: null,
      strYoutube: 'https://www.youtube.com/watch?v=yI7hTz0ft5k',
      strIngredient1: 'Beef',
      strIngredient2: 'Beef Stock',
      strIngredient3: 'Soy Sauce',
      strIngredient4: 'Water',
      strIngredient5: 'Green Pepper',
      strIngredient6: 'Red Pepper',
      strIngredient7: 'Potatoes',
      strIngredient8: 'Carrots',
      strIngredient9: 'Tomato Puree',
      strIngredient10: 'Peanut Butter',
      strIngredient11: 'Chilli Powder',
      strIngredient12: 'Onion',
      strIngredient13: 'Garlic',
      strIngredient14: 'Olive Oil',
      strIngredient15: '',
      strIngredient16: '',
      strIngredient17: '',
      strIngredient18: '',
      strIngredient19: '',
      strIngredient20: '',
      strMeasure1: '2kg cut cubes',
      strMeasure2: '1',
      strMeasure3: '1 tbs',
      strMeasure4: '2 cups ',
      strMeasure5: '1 sliced',
      strMeasure6: '1 sliced',
      strMeasure7: '1 sliced',
      strMeasure8: '1 sliced',
      strMeasure9: '8 ounces',
      strMeasure10: '3  tablespoons',
      strMeasure11: '5',
      strMeasure12: '1 chopped',
      strMeasure13: '5 cloves',
      strMeasure14: '3 tbs',
      strMeasure15: ' ',
      strMeasure16: ' ',
      strMeasure17: ' ',
      strMeasure18: ' ',
      strMeasure19: ' ',
      strMeasure20: ' ',
      strSource: 'https://www.kawalingpinoy.com/beef-caldereta/',
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    },
  ];
  const tagNames = ['Pasta', 'Curry'];

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

  return (
    <>
      {
        meals.map(({ idMeal, strMeal, strCategory, strArea, strMealThumb }, index) => (
          <section key={ idMeal }>
            <Link to={ `/${recipeType}/${idMeal}` }>
              <img
                className="recipe-img"
                alt={ strMeal }
                src={ strMealThumb }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div>
              <Link to={ `/${recipeType}/${idMeal}` }>
                <h2 data-testid={ `${index}-horizontal-name` }>{strMeal}</h2>
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>{strCategory}</p>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { recipeType === 'meal' ? `${strArea}  -  ${strCategory}` : 'Alcóolica'}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>Data</p>
              <ul>
                {
                  tagNames && tagNames.map((tagName) => (
                    <li
                      key={ `${index}-${tagName}` }
                      data-testid={ `${index}-${tagName}-horizontal-tag` }
                    >
                      {tagName}
                    </li>
                  ))
                }
              </ul>
            </div>
            <div>
              <button
                id={ [idMeal, recipeType] }
                onClick={ handleShareBtn }
                data-testid={ `${index}-horizontal-share-btn` }
              >
                <img src={ shareIcon } alt="Compartilhar" />
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

export default RecipesCards;
