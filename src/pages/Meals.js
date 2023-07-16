import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

export default function Meals() {
  return (
    <section className="page-container">
      <Header haveSearch title="Meals" />

      <Recipes />
      <Footer />
    </section>
  );
}
