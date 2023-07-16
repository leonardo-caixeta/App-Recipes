import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';

export default function Drinks() {
  return (
    <section className="page-container">
      <Header haveSearch title="Drinks" />
      <SearchBar food="meals" />

      <Recipes />

      <Footer />
    </section>
  );
}
