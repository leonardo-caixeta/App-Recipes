import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Details from '../components/Details';

export default function RecipeInProgress() {
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
        <Details info={ info } index={ index } />
        <Link
          to="/done-recipes"
        >
          <button
            className="defaultBtn"
            data-testid="finish-recipe-btn"
          >
            Finish Recipe
          </button>
        </Link>

      </section>
    ))
    /*
    <div>
      <img data-testid="recipe-photo" src="" alt="" />
      <h2 data-testid="recipe-title">title</h2>
      <button data-testid="share-btn">share</button>
      <button data-testid="favorite-btn">favorite</button>
      <p data-testid="recipe-category">category</p>
      <p data-testid="instructions">instructions</p>
      <button data-testid="finish-recipe-btn">finish</button>
    </div>
   */
  );
}
