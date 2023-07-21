import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import Recipes from '../components/Recipes';
import FoodProvider from '../contexts/FoodProvider';
import Meals from '../pages/Meals';

test('Renderiza o componente SearchBar', async () => {
  const history = createMemoryHistory({ initialEntries: ['/meals'] });
  const { getByTestId } = render(

    <Router history={ history }>
      <FoodProvider>
        <Meals>
          <Recipes />
        </Meals>
      </FoodProvider>
      ,
    </Router>,
  );

  const searchBarElement = getByTestId('search-top-btn');
  userEvent.click(searchBarElement);
  const searchBar = getByTestId('search-input');
  const radioIngredient = getByTestId('ingredient-search-radio');
  const radioName = getByTestId('name-search-radio');
  const radioFirstLetter = getByTestId('first-letter-search-radio');
  const searchButton = getByTestId('exec-search-btn');

  userEvent.click(searchBarElement);
  userEvent.type(searchBar, 'chicken');
  userEvent.click(radioIngredient);
  userEvent.click(radioName);
  userEvent.click(searchButton);
  userEvent.click(radioFirstLetter);
  userEvent.click(searchButton);
});
