import { useContext, useEffect } from 'react';
import Slider from 'react-slick';
import FoodContext from '../contexts/FoodContext';

const magicNumber = 6;

export default function RecomendedRecipes({ path }) {
  const { recomendedFood, setRecomendedFood, recipeType } = useContext(FoodContext);
  const dataUsed = recomendedFood && Object.values(recomendedFood).slice(0, magicNumber);
  console.log(dataUsed);

  useEffect(() => {
    // if (recipeType === 'Meals') {
    if (path.includes('meals')) {
      console.log(recipeType);
      console.log('usei meal');

      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((r) => r.json())
        .then((data) => setRecomendedFood(data.drinks));
    }
    // if (recipeType === 'Drinks') {
    if (path.includes('drinks')) {
      console.log(recipeType);
      console.log('usei drink');

      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((r) => r.json())
        .then((data) => setRecomendedFood(data.meals));
    }
  }, [recipeType]);

  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true, // Exibe as setas de navegação

  };

  return (
    <section { ...settings } className="recomended-container">
      {recomendedFood && dataUsed.map((info, index) => (
        <div
          data-testid={ `${index}-recommendation-card` }
          className="recomended-card-container"
          key={ index }
        >
          <img
            className="square-img"
            alt={ info.strDrink || info.strMeal }
            src={ info.strMealThumb || info.strDrinkThumb }
          />
          <p
            data-testid={ `${index}-recommendation-title` }
          >
            {info.strDrink || info.strMeal}
          </p>
        </div>
      ))}
    </section>
  );
}
