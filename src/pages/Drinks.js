import { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import FoodContext from '../contexts/FoodContext';

export default function Drinks() {
  const { recipeType, setRecipeType } = useContext(FoodContext);
  useEffect(() => {
    setRecipeType('Drinks');
  });
  return (
    <section className="page-container">
      <Header haveSearch title={ recipeType } />

      <Recipes />
      <Footer />
    </section>
  );
}
