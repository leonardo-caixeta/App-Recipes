import useRedirectUser from '../hooks/useRedirectUser';

// const messageError = 'Sorry, we havent found any recipes for these filters.';

export default async function FetchMeals(store) {
  const {
    searchType,
    searchInput,
    searchResults,
    setSearchResults,
  } = store;

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
  console.log('aqui embaixo');
  const { idMeal } = searchResults.length === 1 && searchResults;
  const path = searchResults.length === 1 && Object.keys(searchResults);
  useRedirectUser(path, idMeal);
}
