import React, { useContext } from 'react';
import FoodContext from '../contexts/FoodContext';

function Categories() {
  const { categories } = useContext(FoodContext);
  return (
    <div className="category-buttons">
      {categories.map((category, index) => (
        <button
          key={ index }
          data-testid={ `${category.strCategory}-category-filter` }
          className="category-button"
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

export default Categories;
