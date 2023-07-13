import { useHistory } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import FoodContext from '../contexts/FoodContext';

// código só funciona após o clique do botão "Buscar"

export default function FirstRecipes({ foodType }) {
  const { searchResults } = useContext(FoodContext);

  const path = Object.keys(searchResults)[0];
  const history = useHistory();

  console.log(searchResults, 'searchResults');

  // não funciona de primeira
  // console.log(searchResults[path].map((info) => console.log(info.idMeal)));
  console.log(searchResults[path]);

  useEffect(() => {
    if (searchResults[path] && searchResults[path].length === 1) {
      console.log('history');
      history.push(`/${path}/${
        foodType === 'meals'
          ? searchResults[path][0].idMeal
          : searchResults[path][0].idDrink
      }`);
    }
  }, [searchResults]);

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
