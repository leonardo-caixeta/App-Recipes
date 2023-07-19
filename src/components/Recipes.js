// RENDERIZA RECOMENDADOS PELAS CATEGORIAS

// import React, { useContext } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import FoodContext from '../contexts/FoodContext';
import FirstRecipes from './FirstRecipes';

function Recipes() {
  const { recipes,
    setDetailId,
    toggleRenderFiltered,
    toggleRenderRecomended,
    searchResults } = useContext(FoodContext);
  const { pathname } = window.location;

  const getRecipePath = (recipe) => {
    if (pathname.includes('/meals')) {
      return `/meals/${recipe.idMeal}`;
    }
    return `/drinks/${recipe.idDrink}`;
  };

  return (
    <main className="recipes-container">
      <Categories />
      <section className="recipes-card-container">
        {(toggleRenderFiltered === false
        && toggleRenderRecomended) && recipes.map((recipe, index) => (
          <Link
            to={ getRecipePath(recipe) }
            key={ index }
            className="recipe-card-link" // Adicione uma classe para estilização
            data-testid={ `${index}-recipe-card` }
            onClick={ setDetailId(recipe.idMeal || recipe.idDrink) }
          >
            <div className="recipe-card">
              <img
                src={ recipe.strMealThumb || recipe.strDrinkThumb }
                alt="Recipe"
                data-testid={ `${index}-card-img` }
                className="recipe-img"
              />
              <p data-testid={ `${index}-card-name` }>
                {recipe.strMeal || recipe.strDrink}
              </p>
            </div>
          </Link> // MapedRecipe / Aqui se renderiza as receitas recomendadas por filtro
        ))}
        {
          (!toggleRenderRecomended && searchResults)
            && <FirstRecipes recipe={ searchResults } />
        }
      </section>
    </main>
  );
}

export default Recipes;
