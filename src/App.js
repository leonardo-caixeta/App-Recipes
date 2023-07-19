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
          <Route path="/meals/:id" component={ RecipeDetails } />
          <Route path="/drinks/:id" component={ RecipeDetails } />
          <Route path="/done-recipes" component={ DoneRecipes } />
        </FoodProvider>
      </Switch>
    </div>
  );
}

export default App;
