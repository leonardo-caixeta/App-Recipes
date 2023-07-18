import { useHistory } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import FoodContext from '../contexts/FoodContext';
import MapedRecipes from './MapedRecipes';

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

    && (<MapedRecipes recipe={ searchResults[path].slice(0, magicNumber) } />
    )
  );
}

FirstRecipes.propTypes = {
  foodType: PropTypes.string.isRequired,
};
