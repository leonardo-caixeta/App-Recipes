import React, { useEffect, useState } from 'react';

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      let endpoint = '';
      if (window.location.pathname === '/meals') {
        endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      } else if (window.location.pathname === '/drinks') {
        endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      }

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const recipeList = data.meals || data.drinks || [];
        console.log(data.drinks);
        const magicNumber = 12;
        setRecipes(recipeList.slice(0, magicNumber));
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }

    fetchRecipes();
  }, []);
  console.log(recipes);

  return (
    <div>
      {recipes.map((recipe, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
          className="recipe-card"
        >
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt="Recipe"
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            {recipe.strMeal || recipe.strDrink}

          </p>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
