// import { useContext, useEffect } from 'react';
import Header from '../components/Header';
import DoneRecipesCards from '../components/DoneRecipesCards';
// import FoodContext from '../contexts/FoodContext';

export default function DoneRecipes() {
  // const { setRecipeType } = useContext(FoodContext);
  // useEffect(() => {
  //   setRecipeType('done');
  // }, []);
  return (
    <section className="page-container">
      <Header haveSearch={ false } title="Done Recipes" />
      <main>
        <section>
          <button data-testid="filter-by-all-btn">All</button>
          <button data-testid="filter-by-meal-btn">Meals</button>
          <button data-testid="filter-by-drink-btn">Drinks</button>
        </section>
        <DoneRecipesCards />
      </main>
    </section>
  );
}
