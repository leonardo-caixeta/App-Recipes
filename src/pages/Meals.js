import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';

export default function Meals() {
  return (
    <>
      <Header haveSearch title="Meals" />
      <SearchBar food="meals" />

      <Recipes />
      <Footer />
    </>
  );
}
