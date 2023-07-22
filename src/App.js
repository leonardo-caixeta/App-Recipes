import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodProvider from './contexts/FoodProvider';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <div className="main-container">
      <Switch>
        <FoodProvider>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route
            exact
            path="/meals/:id"
            render={
              () => <RecipeDetails foodType="meals" />
            }
          />
          <Route
            exact
            path="/drinks/:id"
            render={
              () => <RecipeDetails foodType="drinks" />
            }
          />
          <Route
            path="/meals/:id/in-progress"
            render={
              () => <RecipeInProgress foodType="meals" />
            }
          />
          <Route
            path="/drinks/:id/in-progress"
            render={
              () => <RecipeInProgress foodType="meals" />
            }
          />
        </FoodProvider>
      </Switch>
    </div>
  );
}

export default App;
