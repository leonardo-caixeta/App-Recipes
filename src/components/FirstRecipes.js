import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import FoodContext from '../contexts/FoodContext';

// código só funciona após o clique do botão "Buscar"

export default function FirstRecipes() {
  const { searchResults } = useContext(FoodContext);

  const path = Object.keys(searchResults)[0];
  const history = useHistory();

  console.log('firsRecipes');
  console.log(searchResults, 'searchResults');

  // não funciona de primeira
  // console.log(searchResults[path].map((info) => console.log(info.idMeal)));
  // console.log(searchResults[path] === undefined);

  if (searchResults[path] && searchResults[path] === 1) {
    console.log('history');
    history.push(`/${path}/id`);
  } else {
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
