import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodProvider from './contexts/FoodProvider';
import MealsDetails from './pages/MealsDetails';
import DrinksDetails from './pages/DrinksDetails';

function App() {
  return (
    <div className="meals">
      <Switch>
        <FoodProvider>
          <Route exact path="/" component={ Login } />
          <Route path="/meals" component={ Meals } />
          <Route path="/drinks" component={ Drinks } />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route path="/meals/:id-da-receita" component={ MealsDetails } />
          <Route path="/drinks/:id-da-receita" component={ DrinksDetails } />
        </FoodProvider>
      </Switch>
    </div>
  );
}

// nada

export default App;
