import Header from '../components/Header';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';

export default function Meals() {
  return (
    <div>
      <Header haveSearch title="Meals" />
      <SearchBar />
      <Recipes />
    </div>
  );
}
