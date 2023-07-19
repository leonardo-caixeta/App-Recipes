import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const history = useHistory();
  const [favoriteData, setFavoriteData] = useState([]);
  const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filter, setFilter] = useState('all');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setFavoriteData(favoriteLocalStorage);
  }, []);

  const unFavorite = (id) => {
    const favoritedStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorited = favoritedStorage.filter((clicked) => clicked.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorited));
    setFavoriteData(newFavorited);
  };

  const goToDetails = (type, id) => {
    history.push(`/${type}s/${id}`);
    console.log('goTo');
  };

  const copyLink = (type, id) => {
    setCopiedLink(true);
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
  };

  return (
    <>
      <Header
        title="Favorite Recipes"
        haveSearch={ false }
      />

      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('all') }
      >
        All
      </button>

      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => setFilter('meals') }
      >
        Meals
      </button>

      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drinks') }
      >
        Drinks
      </button>

      {
        favoriteData && (
          favoriteData.filter((recipe) => {
            switch (filter) {
            case 'drinks': return recipe.type === 'drink';
            case 'meals': return recipe.type === 'meal';
            default: return recipe;
            }
          }).map((recipe, index) => (
            // card
            <div key={ index }>
              <button
                type="button"
                onClick={ () => goToDetails(recipe.type, recipe.id) }
                style={ { maxWidth: '360px' } }
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                  style={ { maxWidth: '100%' } }
                />
              </button>

              <h3
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.category }
              </h3>

              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <h2
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipe.name }
                </h2>
              </Link>

              {
                recipe.type === 'meal' ? (
                  <h2
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${recipe.nationality} - ${recipe.category}`}
                  </h2>
                ) : (
                  <h2
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { recipe.alcoholicOrNot }
                  </h2>
                )
              }

              <button
                onClick={ () => copyLink(recipe.type, recipe.id) }
              >
                <img
                  src={ shareIcon }
                  alt="share"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>

              <button
                onClick={ () => unFavorite(recipe.id) }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="favorite"
                />
              </button>

              {
                copiedLink && <p>Link copied!</p>
              }
            </div>
          ))
        )
      }
    </>
  );
}
