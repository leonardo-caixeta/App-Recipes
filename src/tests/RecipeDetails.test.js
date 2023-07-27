import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import RecipeDetails from '../pages/RecipeDetails';
import FoodProvider from '../contexts/FoodProvider';

jest.mock('clipboard-copy', () => jest.fn());

// const apiDataMock = {
//   drinks: [
//     {
//       idDrink: '15997',
//       strDrink: 'GG',
//     },
//   ],
// };

const favoriteRecipesMock = [
  {
    id: '15997',
    type: 'drinks',
    area: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Alcoholic',
    name: 'GG',
  },
];

const doneRecipesMock = [
  {
    id: '52771',
    type: 'meals',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
  },
];

describe('Testa a página de detalhes de uma receita', () => {
  beforeEach(() => {
    // Mock do localStorage para retornar dados de teste
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockImplementation((key) => {
          if (key === 'favoriteRecipes') {
            return JSON.stringify(favoriteRecipesMock);
          } if (key === 'doneRecipes') {
            return JSON.stringify(doneRecipesMock);
          }
          return null;
        }),
        setItem: jest.fn(),
      },
      writable: true,
    });
  });
  test('Verifica se os elementos da tela de detalhes de uma receita de comida são renderizados corretamente', async () => {
    render(

      <MemoryRouter initialEntries={ ['/drinks/15997'] }>
        <Route path="/:foodType/:id">
          <FoodProvider>
            <RecipeDetails />
          </FoodProvider>
        </Route>
      </MemoryRouter>,

    );

    const ingredients = await screen.findAllByTestId(/ingredient-name-and-measure/i);
    const headings = await screen.findAllByRole('heading');
    const continueRecipes = screen.queryByTestId('start-recipe-btn');

    expect(await screen.findByTestId('recipe-title')).toHaveTextContent('GG');
    expect(await screen.findByTestId('recipe-category')).toHaveTextContent('Optional alcohol');
    expect(ingredients[0]).toHaveTextContent('Galliano');
    expect(ingredients[1]).toHaveTextContent('Galliano - 2 1/2 shots');
    expect(await screen.findByTestId('instructions')).toHaveTextContent(/You now have a your very own GG./i);
    expect(await screen.findByTestId('share-btn')).toBeInTheDocument();
    expect(headings[1]).toHaveTextContent('Ingredients');
    expect(headings[2]).toHaveTextContent('Instructions');
    expect(headings[3]).toHaveTextContent('Video');
    expect(headings[4]).toHaveTextContent('Recomended');
    expect(continueRecipes).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('favorite-btn'));
    fireEvent.click(screen.getByTestId('share-btn'));

    // PROGRESSO RECIPEDETAILS CONTINUAR DESSE PONTO //
  });
});
