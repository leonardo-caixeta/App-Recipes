import { useEffect, useState } from 'react';
import RecomendedRecipes from '../components/RecomendedRecipes';

const magicNumber = 20;

export default function RecipeDetails() {
  function renderIngredients(info) {
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

  const [apiData, setApiData] = useState([]);

  const id = window.location.pathname.replace(/^\/[^/]+\//, '');
  const path = window.location.pathname.split('/')[1];

  useEffect(() => {
    if (path === 'meals') {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((r) => r.json())
        .then((data) => setApiData(data[path]));
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((r) => r.json())
        .then((data) => setApiData(data[path]));
    }
  }, [id, path]);

  console.log(apiData);

  return (
    apiData && apiData.map((info, index) => (
      <main key={ index } className="recipes-details-container">
        <header>
          <img
            src={ info.strMealThumb || info.strDrinkThumb }
            alt={ info.strMeal || info.strDrink }
            data-testid="recipe-photo"
            className="recipe-photo"
          />
          <div>
            <p
              data-testid="recipe-category"
              className="recipe-category"
            >
              { info.strAlcoholic || info.strCategory }

            </p>
            <h2 data-testid="recipe-title">{info.strMeal || info.strDrink}</h2>
          </div>
        </header>
        <section className="instructions-container">
          <h3>Ingredients:</h3>
          <section
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {
              renderIngredients(info)
            }
          </section>
          <h3>Instructions:</h3>
          <section>
            <p data-testid="instructions">{info.strInstructions}</p>
          </section>
          <h3>Video:</h3>
          <section>
            <video
              src={ info.strYoutube }
              data-testid="video"
            >
              <track src="" kind="captions" srcLang="en" label="English" default />
            </video>
          </section>
          {/* Implementar lógica para botão. Corrigir tipo da receita recomendada */}
          <h3>Recomended:</h3>
          <section className="recomended-container">
            <RecomendedRecipes path={ path } />
          </section>
          <button
            className="defaultBtn"
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
        </section>
      </main>
    ))

  );
}
