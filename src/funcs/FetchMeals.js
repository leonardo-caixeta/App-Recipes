export default async function FetchMeals(store) {
  const {
    searchType,
    searchInput,
    setSearchInput,
    setSearchResults,
  } = store;

  if (searchInput) {
    switch (searchType) {
    case 'ingredient':
      await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data));
      break;

    case 'name':
      await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${`${searchInput[0].toUpperCase()}${searchInput.substring(1)}`}`)
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
  setSearchInput('');
}
