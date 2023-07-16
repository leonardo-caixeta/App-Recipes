import Header from '../components/Header';
import RecipesCards from '../components/RecipesCards';

export default function DoneRecipes() {
  return (
    <section className="page-container">
      <Header haveSearch={ false } title="Done Recipes" />
      <main>
        <section>
          <button data-testid="filter-by-all-btn">All</button>
          <button data-testid="filter-by-meal-btn">Meals</button>
          <button data-testid="filter-by-drink-btn">Drinks</button>
        </section>
        <RecipesCards />
      </main>
    </section>
  );
}
