import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import FoodProvider from '../contexts/FoodProvider';
import Recipes from '../components/Recipes';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';

const search = 'search-input';
const bar = 'search-top-btn';
const button = 'exec-search-btn';

// Não está sendo testado se ao clicar no card a página é redirecionada para a página de detalhes.

describe('Recipe Componente', () => {
  test('renderiza corretamente os cards de receita ao utilizar a barra de busca na página /meals', async () => {
    render(
      <BrowserRouter>
        <FoodProvider>
          <Meals>
            <Recipes />
          </Meals>
        </FoodProvider>
      </BrowserRouter>,
    );
    const searchBarElement = screen.getByTestId(bar);
    fireEvent.click(searchBarElement);

    const searchBar = screen.getByTestId(search);
    const radioIngredientElement = screen.getByTestId('ingredient-search-radio');
    const searchButton = screen.getByTestId(button);

    fireEvent.change(searchBar, { target: { value: 'chicken' } });
    fireEvent.click(radioIngredientElement);
    fireEvent.click(searchButton);

    await waitFor(() => {
      const recipeCards = screen.getAllByTestId(/card-name/);
      expect(recipeCards).toHaveLength(11);
      expect(recipeCards[1]).toHaveTextContent('Chicken & mushroom Hotpot');
    });
  });
  test('renderiza corretamente os cards de receita ao utilizar a barra de busca na página /drinks', async () => {
    render(
      <BrowserRouter>
        <FoodProvider>
          <Drinks>
            <Recipes />
          </Drinks>
        </FoodProvider>
      </BrowserRouter>,
    );
    const searchBarElement = screen.getByTestId(bar);
    fireEvent.click(searchBarElement);

    const searchBar = screen.getByTestId(search);
    const radioName = screen.getByTestId('name-search-radio');
    const searchButton = screen.getByTestId(button);

    fireEvent.change(searchBar, { target: { value: 'blood' } });
    fireEvent.click(radioName);
    fireEvent.click(searchButton);

    await waitFor(() => {
      const recipeCards = screen.getAllByTestId(/card-name/);
      expect(recipeCards).toHaveLength(3);
      expect(recipeCards[0]).toHaveTextContent('Bloody Mary');
    });
  });
  test('Testando parâmetro de busca inválido', async () => {
    render(
      <BrowserRouter>
        <FoodProvider>
          <Meals>
            <Recipes />
          </Meals>
        </FoodProvider>
      </BrowserRouter>,
    );

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const searchBarElement = screen.getByTestId(bar);
    fireEvent.click(searchBarElement);

    const searchBar = screen.getByTestId(search);
    const radioName = screen.getByTestId('name-search-radio');
    const searchButton = screen.getByTestId(button);

    fireEvent.change(searchBar, { target: { value: 'xablau' } });
    fireEvent.click(radioName);
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledTimes(1);
    });
    alertSpy.mockRestore();
  });
  test('Testando parâmetro de busca inválido', async () => {
    render(
      <BrowserRouter>
        <FoodProvider>
          <Meals>
            <Recipes />
          </Meals>
        </FoodProvider>
      </BrowserRouter>,
    );

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const searchBarElement = screen.getByTestId('search-top-btn');
    fireEvent.click(searchBarElement);

    const searchBar = screen.getByTestId('search-input');
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    fireEvent.change(searchBar, { target: { value: 'abc' } });
    fireEvent.click(radioFirstLetter);
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledTimes(1);
    });
    alertSpy.mockRestore();
  });
});
