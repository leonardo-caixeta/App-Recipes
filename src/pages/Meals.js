import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

export default function Meals() {
  return (
    <div>
      <Header haveSearch title="Meals" />
      <SearchBar />
    </div>
  );
}
