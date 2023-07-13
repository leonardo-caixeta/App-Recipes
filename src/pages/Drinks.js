import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Recipes from '../components/Recipes';

export default function Drinks() {
  return (
    <>
      <Header haveSearch title="Drinks" />
      <SearchBar food="drinks" />
      <Recipes />

      <Footer />
    </>
  );
}
