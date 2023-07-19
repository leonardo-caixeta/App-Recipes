// import { useContext, useEffect } from 'react';
import { useState } from 'react';
import Header from '../components/Header';
import DoneRecipesCards from '../components/DoneRecipesCards';

export default function DoneRecipes() {
  const [typeOfFilter, setTypeOfFilter] = useState('');

  return (
    <section className="page-container">
      <Header haveSearch={ false } title="Done Recipes" />
      <main>
        <section className="filter-btns-container">
          <button
            data-testid="filter-by-all-btn"
            className="category-button"
            onClick={ () => setTypeOfFilter('') }
          >
            All
          </button>
          <button
            data-testid="filter-by-meal-btn"
            className="category-button"
            onClick={ () => setTypeOfFilter('idMeal') }
          >
            Meals
          </button>
          <button
            data-testid="filter-by-drink-btn"
            className="category-button"
            onClick={ () => setRecipeType('idDrink') }
          >
            Drinks
          </button>
        </section>
        <DoneRecipesCards typeOfFilter={ typeOfFilter } />
      </main>
    </section>
  );
}
