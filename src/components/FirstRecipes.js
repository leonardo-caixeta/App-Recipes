import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import FoodContext from '../contexts/FoodContext';

const errorMessage = 'Sorry, we havent found any recipes for these filters.';

export default function FirstRecipes() {
  const { searchResults } = useContext(FoodContext);
  const path = Object.keys(searchResults)[0];
  const history = useHistory();

  console.log('firsRecipes');
  console.log(searchResults);

  // não funciona de primeira
  // console.log(searchResults[path].map((info) => console.log(info.idMeal)));
  // console.log(searchResults[path].length);

  if (searchResults[path] === 1 && searchResults[path].length === undefined) {
    console.log('history');
    history.push(`/${path}/id`);
  } else {
    if (searchResults[path] === null) {
      global.alert(errorMessage);
    }
    return (
      <div>
        {/* {
          searchResults.length < 1
            ? (
              <div>

              </div>
            )
            : (
              <Redirect to="" />
            )
        } */}
        olá
      </div>
    );
  }
}
