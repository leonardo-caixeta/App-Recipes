import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useMemo, useState } from 'react';
import FoodContext from '../contexts/FoodContext';

const errorMessage = 'Sorry, we havent found any recipes for these filters.';

export default function FirstRecipes() {
  const { searchResults } = useContext(FoodContext);
  const [data, setData] = useState([]);
  useEffect(() => setData(searchResults), []);
  useMemo(() => setData(searchResults), [searchResults]);
  const path = Object.keys(data)[0];
  const history = useHistory();

  console.log('firsRecipes');
  console.log(searchResults);
  console.log(data, 'data');

  // não funciona de primeira
  // console.log(searchResults[path].map((info) => console.log(info.idMeal)));
  // console.log(data[path].length);

  if (data[path] === 1 && data[path].length !== undefined) {
    console.log('history');
    history.push(`/${path}/id`);
  } else {
    if (data[path] === null) {
      global.alert(errorMessage);
    }
    return (
      <div>
        {/* {
          data.length < 1
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
