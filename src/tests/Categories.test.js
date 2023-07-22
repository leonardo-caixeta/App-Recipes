import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { act } from 'react-dom/test-utils';
import FoodProvider from '../contexts/FoodProvider';

import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import Categories from '../components/Categories';
import renderWithRouter from '../renderWithRouter';

/*  Testar as receitas que aparecem na tela. Testar caso true e false de filterCategories, toggleRenderFiltered, toggleRenderRecomended */

describe('Componente Categories', () => {
  test('Deve fazer a busca quando um botão de categoria é selecionado na pagina meals', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({

        meals: [
          { strCategory: 'Beef' },
          { strCategory: 'Breakfast' },
        ],
      }),
    });

    const breakfastCategory = 'Breakfast-category-filter';
    const { history } = renderWithRouter(
      <FoodProvider>
        <Meals>
          <Categories />
        </Meals>
      </FoodProvider>,

    );

    act(() => {
      history.push('/meals');
    });
    expect(screen.queryByTestId(breakfastCategory)).not.toBeInTheDocument();

    await waitFor(() => {
      // screen.debug();
      expect(history.location.pathname).toBe('/meals');
      expect(screen.getByTestId(breakfastCategory)).toBeInTheDocument();
      fireEvent.click(screen.getByTestId(breakfastCategory));
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=breakfast');
    });
  });

  test('Deve fazer a busca quando um botão de categoria é selecionado na pagina drinks', async () => {
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
      <Router history={ createMemoryHistory({ initialEntries: ['/drinks'] }) }>
        <FoodProvider>
          <Drinks>
            <Categories />
          </Drinks>
        </FoodProvider>
      </Router>,
    );
    await waitFor(() => {
      expect(screen.getByTestId(/milk-shake-category-filter/i)).toBeInTheDocument();
      fireEvent.click(screen.getByTestId(/milk-shake-category-filter/i));
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=milk-shake');
      fireEvent.click(screen.getByTestId(/milk-shake-category-filter/i));
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
      <Router history={ createMemoryHistory({ initialEntries: ['/drinks'] }) }>
        <FoodProvider>
          <Drinks>
            <Categories recipes={ recipesList } />
          </Drinks>
        </FoodProvider>
      </Router>,
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
