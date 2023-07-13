export default async function FetchDrinks(store) {
  const {
    searchType,
    searchInput,
    setSearchResults,
  } = store;

  switch (searchType) {
  case 'ingredient':
    await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data));
    break;

  case 'name':
    await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data));
    break;

  case 'letter':
    await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data));
    break;

  default:
    break;
  }
}
