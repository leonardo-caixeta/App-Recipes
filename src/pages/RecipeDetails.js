import { useEffect, useState } from 'react';

const magicNumber = 20;

function renderIngredients(info) {
  const ingredients = [];

  for (let i = 1; i <= magicNumber; i += 1) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;

    if (info[ingredientKey] && info[measureKey]) {
      const ingredientName = info[ingredientKey];
      const ingredientMeasure = info[measureKey];
      ingredients.push(
        <div key={ i } data-testid={ `${i - 1}-ingredient-name-and-measure` }>
          <span style={ { marginLeft: '5px' } }>{ `${ingredientName} -` }</span>

          <span style={ { marginLeft: '5px' } }>{ `${ingredientMeasure}` }</span>
        </div>,
      );
    }
  }

  return ingredients;
}

export default function RecipeDetails() {
  const [apiData, setApiData] = useState([]);
  console.log(apiData);

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
  }, []);
  return (
    <div>
      {
        apiData && apiData.map((info, index) => (
          <div key={ index }>
            <img
              src={ info.strMealThumb || info.strDrinkThumb }
              alt={ info.strMeal || info.strDrink }
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{info.strMeal || info.strDrink}</h2>
            <p data-testid="recipe-category">{ info.strAlcoholic || info.strCategory }</p>
            <section
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {
                renderIngredients(info)
              }
            </section>
            <p data-testid="instructions">{info.strInstructions}</p>
            <video
              src={ info.strYoutube }
              data-testid="video"
            >
              <track src="" kind="captions" srcLang="en" label="English" default />
            </video>
          </div>
        ))
      }
    </div>
  );
}
