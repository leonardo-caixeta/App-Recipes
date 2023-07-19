import { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import FoodContext from '../contexts/FoodContext';

export default function Meals() {
  const { setRecipeType } = useContext(FoodContext);
  useEffect(() => {
    setRecipeType('meals');
  }, []);
  return (
    <section className="page-container">
      <Header haveSearch title="Meals" />
      <Recipes />
      <Footer />
    </section>
  );
}
