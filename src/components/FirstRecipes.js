import { useHistory } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import FoodContext from '../contexts/FoodContext';

const magicNumber = 12;

export default function FirstRecipes({ foodType }) {
  const { searchResults } = useContext(FoodContext);

  const path = Object.keys(searchResults)[0];
  const history = useHistory();

  useEffect(() => {
    if (searchResults[path] && searchResults[path].length === 1) {
      history.push(`/${path}/${
        foodType === 'meals'
          ? searchResults[path][0].idMeal
          : searchResults[path][0].idDrink
      }`);
    }
  }, [searchResults]);

  return (
    searchResults[path]
    && (
      <div>
        {
          (foodType === 'meals')
            ? searchResults[path].slice(0, magicNumber).map((info, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ info.strMealThumb }
                  alt={ info.strCategory }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  { info.strMeal }
                </p>
              </div>
            ))
            : searchResults[path].slice(0, magicNumber).map((info, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ info.strDrinkThumb }
                  alt={ info.strCategory }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  { info.strDrink }
                </p>
              </div>
            ))
        }
      </div>
    )
  );
}

FirstRecipes.propTypes = {
  foodType: PropTypes.string.isRequired,
};
