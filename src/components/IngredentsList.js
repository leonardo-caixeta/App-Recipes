import React, { useState } from 'react';

const MAX_INGREDIENTS = 20;
export function IngredentsList({ info, index }) {
  const ingredients = [];

  for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;

    if (info[ingredientKey] && info[measureKey]) {
      ingredients.push([info[ingredientKey], info[measureKey]]);
    }
  }

  console.log(ingredients);

  function verificarCheckboxesMarcados() {
    const checkboxes = document.querySelectorAll('.checkbox-ingredients');
    for (const checkbox of checkboxes) {
      if (!checkbox.checked) {
        console.log(checkbox.checked);
        return false; // Se algum checkbox não estiver marcado, retorna false
      }
      console.log(checkbox.checked);
    }
    return true; // Se todos os checkboxes estiverem marcados, retorna true
  }

  console.log(verificarCheckboxesMarcados());

  return (
    <form style={ { display: 'flex', flexDirection: 'column' } }>
      {
        ingredients.map((ingredient) => (
          <label
            style={ { display: 'flex', flexDirection: 'row' } }
            key={ `${ingredient[0]}-${ingredient[1]}` }
            htmlFor={ `${ingredient[0]}-${ingredient[1]}` }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              className="checkbox-ingredients"
              value={ `${ingredient[0]}` }
              onChange={ ({ target }) => target.checked }
            />
            {`${ingredient[0]}-${ingredient[1]}`}
          </label>
        ))
      }
    </form>
  );
}
