import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

export default function Meals() {
  return (
    <>
      <Header haveSearch title="Meals" />
      <SearchBar food="meal" />

      <Footer />
    </>
  );
}
