import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

export default function Drinks() {
  return (
    <>
      <Header haveSearch title="Drinks" />
      <SearchBar food="drinks" />

      <Footer />
    </>
  );
}
