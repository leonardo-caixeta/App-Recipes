/* const magicNumber = 20;

export function renderIngredients(info) {
  const ingredients = [];

  for (let i = 1; i <= magicNumber; i += 1) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;

    if (info[ingredientKey] && info[measureKey]) {
      const ingredientName = info[ingredientKey];
      const ingredientMeasure = info[measureKey];
      ingredients.push(
        <li key={ i } data-testid={ `${i - 1}-ingredient-name-and-measure` }>
          { `${ingredientName} - ${ingredientMeasure}` }
        </li>,
      );
    }
  }

  return ingredients;
}

export function renderIngredientsHasChecklist(info) {
  const ingredients = [];

  for (let i = 1; i <= magicNumber; i += 1) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;

    if (info[ingredientKey] && info[measureKey]) {
      const ingredientName = info[ingredientKey];
      const ingredientMeasure = info[measureKey];

      ingredients.push({ ingredientName, ingredientMeasure });
    }
  }
  console.log(ingredients);
  return ingredients;
}
 */
