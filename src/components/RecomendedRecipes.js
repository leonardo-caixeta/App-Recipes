import { useContext, useEffect } from 'react';
import FoodContext from '../contexts/FoodContext';

const magicNumber = 6;

export default function RecomendedRecipes({ foodType }) {
  const { recomendedFood, setRecomendedFood } = useContext(FoodContext);
  const dataUsed = recomendedFood && Object.values(recomendedFood).slice(0, magicNumber);
  console.log(dataUsed);

  useEffect(() => {
    if (foodType === 'meals') {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((r) => r.json())
        .then((data) => setRecomendedFood(data.drinks));
    } else {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((r) => r.json())
        .then((data) => setRecomendedFood(data.meals));
    }
  }, []);
  return (
    recomendedFood && dataUsed.map((info, index) => (
      <div key={ index } data-testid={ `${index}-recommendation-card` }>
        <p
          data-testid={ `${index}-recommendation-title` }
        >
          {info.strDrink || info.strMeal}
        </p>
      </div>
    ))
  );
}
