import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import FoodProvider from '../contexts/FoodProvider';

import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import Categories from '../components/Categories';

describe('Componente Categories', () => {
  test.skip('Deve fazer a busca quando um botão de categoria é selecionado na pagina meals', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: [
          { strCategory: 'Beef' },
          { strCategory: 'Breakfast' },
        ],
      }),
    });
    render(
      <BrowserRouter history={ createMemoryHistory({ initialEntries: ['/meals'] }) }>
        <FoodProvider>
          <Meals>
            <Categories />
          </Meals>
        </FoodProvider>
      </BrowserRouter>,
    );
    await waitFor(() => {
      expect(screen.getByTestId(/Beef-category-filter/i)).toBeInTheDocument();
      screen.debug();
      fireEvent.click(screen.getByTestId(/Beef-category-filter/i));
      expect(global.fetch).toHaveBeenCalled();
    });
  });
  test.skip('Deve fazer a busca quando um botão de categoria é selecionado na pagina drinks', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [
          { strCategory: 'vodka' },
          { strCategory: 'milk-shake' },
          { strCategory: 'cocoa' },
        ],
      }),
    });
    render(
      <BrowserRouter history={ createMemoryHistory({ initialEntries: ['/drinks'] }) }>
        <FoodProvider>
          <Drinks>
            <Categories />
          </Drinks>
        </FoodProvider>
      </BrowserRouter>,
    );
    await waitFor(() => {
      expect(screen.getByTestId(/milk-shake-category-filter/i)).toBeInTheDocument();
      screen.debug();
      fireEvent.click(screen.getByTestId(/milk-shake-category-filter/i));
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=milk-shake');
    });
  });
  test('Testa a função toggle no botão ALL', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [
          { strCategory: 'Cocktail' },
          { strCategory: 'Shake' },
          { strCategory: 'Cocoa' },
        ],
      }),
    });

    const recipesList = [
      { strCategory: 'Cocktail', strDrinkThumb: 'imagem1.jpg', strDrink: 'Drink 1' },
      { strCategory: 'Shake', strDrinkThumb: 'imagem2.jpg', strDrink: 'Drink 2' },
      { strCategory: 'Cocoa', strDrinkThumb: 'imagem3.jpg', strDrink: 'Drink 3' },
    ];

    render(
      <BrowserRouter history={ createMemoryHistory({ initialEntries: ['/drinks'] }) }>
        <FoodProvider>
          <Drinks>
            <Categories recipes={ recipesList } />
          </Drinks>
        </FoodProvider>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId(/cocoa-category-filter/i)).toBeInTheDocument();
      const recipes = screen.getAllByTestId(/card-img/i);
      expect(recipes.length).toBe(3);
      fireEvent.click(screen.getByTestId(/cocoa-category-filter/i));
      fireEvent.click(screen.getByTestId(/all-category-filter/i));
      expect(recipes[0]);
      // const allRecipes = screen.getAllByTestId(/recipe-card/i);
      // expect(allRecipes[0]).toBeInTheDocument();
      // expect(allRecipes.length).toBe(3);
      // fireEvent.click(screen.getByTestId(/all-category-filter/i));
    });
    screen.debug();
  });
});
