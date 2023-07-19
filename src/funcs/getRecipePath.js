export const getRecipePath = (recipe, pathname) => {
  if (pathname.includes('/meals')) {
    return `/meals/${recipe.idMeal}`;
  }
  return `/drinks/${recipe.idDrink}`;
};

export const getRecipeDonePath = (recipe) => {
  if (recipe.idMeal) {
    return `/meals/${recipe.idMeal}`;
  }
  return `/drinks/${recipe.idDrink}`;
};
