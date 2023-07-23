import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IngredientCheckbox } from './IngredientCheckbox';
import FoodContext from '../contexts/FoodContext';

const MAX_INGREDIENTS = 20;
export function IngredentsList({ info, index }) {
  const { checkedList, isFinished, setIsFinished } = useContext(FoodContext);

  const ingredients = [];

  for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;

    if (info[ingredientKey] && info[measureKey]) {
      ingredients.push({ item: info[ingredientKey], measure: info[measureKey] });
    }
  }
  function checkArrays(a1, a2) {
    return JSON.stringify(a1) === JSON.stringify(a2);
  }

  // console.log(ingredients);
  useEffect(() => {
    const sortedCheckedList = [...checkedList];
    const sortedingredientsList = ingredients.map(({ item }) => item);
    const status = checkArrays(sortedingredientsList.sort(), sortedCheckedList);

    setIsFinished(status);
  }, [checkedList]);

  console.log(isFinished);
  return (
    <form style={ { display: 'flex', flexDirection: 'column' } }>
      {
        ingredients.map((ingredient, indx) => (
          // console.log(item, measure)
          <IngredientCheckbox
            key={ indx }
            index={ index }
            ingredient={ ingredient }
          />
        ))
      }
    </form>
  );
}

IngredentsList.propTypes = {
  index: PropTypes.number.isRequired,
  info: PropTypes.shape({ }).isRequired,
};
