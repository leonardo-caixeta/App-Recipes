import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import FoodProvider from '../contexts/FoodProvider';

import RecipeInProgress from '../pages/RecipeInProgress';

const mockContextValue = {
  isFinished: false,
};

const mockApiResponse = {
  drinks: [{ idDrink: '15997', strDrink: 'GG', strCategory: 'Cocktail', strAlcoholic: 'Optional alcohol', strGlass: 'Collins Glass', strInstructions: 'Mix', strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg', strIngredient1: 'Galliano', strIngredient2: 'Gin' }],
  meals: [{ idMeal: '53065', strMeal: 'Sushi', strCategory: 'Side', strArea: 'Japanese', strInstructions: 'Mix', strMealThumb: 'https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg', strIngredient1: 'Rice', strIngredient2: 'Nori' }],
};

const mockFetch = Promise.resolve({
  json: () => Promise.resolve(mockApiResponse),
});

describe('RecipeInProgress', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Deve buscar os dados da API e renderizar os detalhes da receita da página Drinks', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(() => mockFetch);

    render(
      <MemoryRouter initialEntries={ ['/drinks/15997'] }>
        <FoodProvider value={ mockContextValue }>
          <RecipeInProgress />
        </FoodProvider>
      </MemoryRouter>,
    );

    await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997'));
    expect(await screen.findByText('GG')).toBeInTheDocument();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Deve buscar os dados da API e renderizar os detalhes da receita da página Meals ', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(() => mockFetch);

    render(
      <MemoryRouter initialEntries={ ['/meals/53065'] }>
        <FoodProvider value={ mockContextValue }>
          <RecipeInProgress />
        </FoodProvider>
      </MemoryRouter>,
    );

    await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=53065'));
    expect(await screen.findByText('Sushi')).toBeInTheDocument();
  });
});
