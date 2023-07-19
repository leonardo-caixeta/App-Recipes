export const getRecipePath = (recipe, pathname) => {
  if (pathname.includes('/meals')) {
    return `/meals/${recipe.idMeal}`;
  }
  return `/drinks/${recipe.idDrink}`;
};
