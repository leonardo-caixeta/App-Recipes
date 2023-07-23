import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FoodContext from '../contexts/FoodContext';

export function IngredientCheckbox({ ingredient, index }) {
  const { item, measure } = ingredient;
  const [isChecked, setIsChecked] = useState(false);
  const { checkedList, setCheckedList } = useContext(FoodContext);

  useEffect(() => {
    const checkedItem = isChecked === false
      ? checkedList
        .filter((element) => element !== item) : [...checkedList, item];
    checkedItem.sort();
    setCheckedList(checkedItem);
  }, [isChecked]);

  return (
    <label
      key={ `${item}-${measure}` }
      htmlFor={ `${item}-${measure}` }
      data-testid={ `${index}-ingredient-step` }
      style={ isChecked
        ? { display: 'flex',
          flexDirection: 'row',
          textDecoration: 'line-through solid rgb(0, 0, 0)' }
        : { display: 'flex', flexDirection: 'row' } }
    >
      <input
        type="checkbox"
        className="checkbox-ingredients"
        value={ `${item}` }
        id={ `${item}-${measure}` }
        onChange={ () => setIsChecked(!isChecked) }
        checked={ isChecked }
      />
      {`${item}-${measure}`}
    </label>
  );
}

IngredientCheckbox.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.shape({
    item: PropTypes.string,
    measure: PropTypes.string,
  }).isRequired,
};
