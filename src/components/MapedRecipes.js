// MAP DE RECEITAS

export default function MapedRecipes({ recipe }) {
  return (
    recipe.map((info, index) => (
      <div
        key={ info.idMeal || info.idDrink }
        className="recipe-card"
        data-testid={ `${index}-recipe-card` }
      >
        <img
          src={ info.strMealThumb || info.strDrinkThumb }
          alt="info"
          className="info-img"
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>
          {info.strMeal || info.strDrink}
        </p>
      </div>
    ))
  );
}
