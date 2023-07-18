import { useContext, useEffect } from 'react';
import Header from '../components/Header';
import FoodContext from '../contexts/FoodContext';

export default function FavoriteRecipes() {
  const { setRecipeType } = useContext(FoodContext);
  useEffect(() => {
    setRecipeType('Favorite Recipes');
  });
  return (
    <section className="page-container">
      FavoriteRecipes
      <Header haveSearch={ false } title="Favorite Recipes" />
    </section>
  );
}
