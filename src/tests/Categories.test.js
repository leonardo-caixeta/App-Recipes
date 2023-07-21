import React from 'react';

import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import FoodContext from '../contexts/FoodContext';
import Categories from '../components/Categories';
import Meals from '../pages/Meals';

describe('Componente Categories', () => {
  test('Deve fazer a busca quando um botão de categoria é selecionado', async () => {
    const categories = [
      { strCategory: 'Beef' },
      { strCategory: 'Breakfast' },
      { strCategory: 'Chicken' },
      { strCategory: 'Dessert' },
      { strCategory: 'Goat' },
    ];

    const setSearchResultsMock = jest.fn();
    const setRecipeType = jest.fn();
    render(
      <Router history={ createMemoryHistory({ initialEntries: ['/meals'] }) }>
        <FoodContext.Provider
          value={ { categories, setSearchResultsMock, setRecipeType } }
        >
          <Meals>
            <Categories />
          </Meals>
        </FoodContext.Provider>
      </Router>,
    );

    screen.debug();

    // Seleção de botões das categorias

    const allFilterCatetories = screen.getAllByTestId(/category-filter/i);
    // const categoryButton1 = screen.getByTestId('Beef-category-filter');
    // const categoryButton2 = screen.getByTestId('Breakfast-category-filter');
    // const categoryButton3 = screen.getByTestId('Chicken-category-filter');
    // const categoryButton4 = screen.getByTestId('Dessert-category-filter');
    // const categoryButton5 = screen.getByTestId('Goat-category-filter');
    // const categoryButtonAll = screen.getByTestId('All-category-filter');
    expect(allFilterCatetories.length).toBe(6);

    // ações de clique nos botões das categorias
    // expect(setSearchResultsMock).toHaveBeenCalledTimes(0);
    // expect(setRecipeType).toHaveBeenCalledTimes(1);
  });
});
