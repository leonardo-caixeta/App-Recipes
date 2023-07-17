import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

export default function Drinks() {
  return (
    <section className="page-container">
      <Header haveSearch title="Drinks" />

      <Recipes />
      <Footer />
    </section>
  );
}
