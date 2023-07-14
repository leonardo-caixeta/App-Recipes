import Header from '../components/Header';
import DoneMealCard from '../components/DoneMealCard';

export default function DoneRecipes() {
  return (
    <>
      <Header haveSearch={ false } title="Done Recipes" />
      <main>
        <section>
          <button data-testid="filter-by-all-btn">All</button>
          <button data-testid="filter-by-meal-btn">Meals</button>
          <button data-testid="filter-by-drink-btn">Drinks</button>
        </section>
        <DoneMealCard />
      </main>
    </>
  );
}
