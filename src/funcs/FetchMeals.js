import { useHistory } from 'react-router-dom';

export default async function FetchMeals(store) {
  const {
    searchType,
    searchInput,
    searchResults,
    setSearchResults,
  } = store;
  const history = useHistory();

  if (searchInput.length > 1 && searchType === 'letter') {
    global.alert('Your search must have only 1 (one) character');
  } else {
    switch (searchType) {
    case 'ingredient':
      await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data));
      break;

    case 'name':
      await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data));
      break;

    case 'letter':
      await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data));
      break;

    default:
      break;
    }
  }
  if (searchResults.length === 1) {
    history.push(`/drinks/${searchResults.idDrink}`);
  }
}
