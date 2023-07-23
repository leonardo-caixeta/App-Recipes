import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Details from '../components/Details';
import FoodContext from '../contexts/FoodContext';

export default function RecipeInProgress() {
  const { isFinished } = useContext(FoodContext);

  const [apiData, setApiData] = useState([]);

  const location = useLocation();

  const id = location.pathname.replace(/^\/[^/]+\//, '').replace('/in-progress', '');
  const path = location.pathname.split('/')[1];

  useEffect(() => {
    if (path === 'meals') {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((r) => r.json())
        .then((data) => setApiData(data[path]));
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((r) => r.json())
        .then((data) => setApiData(data[path]));
    }
  }, [id, path]);

  return (
    apiData && apiData.map((info, index) => (
      <section key={ index }>
        <Details info={ info } index={ index } foodType={ path } />
        <button
          className="defaultBtn"
          data-testid="finish-recipe-btn"
          disabled={ !isFinished }
        >
          <Link
            to="/done-recipes"
          >
            Finish Recipe
          </Link>
        </button>

      </section>
    ))
  );
}
