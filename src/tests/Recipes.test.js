import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import FoodProvider from '../contexts/FoodProvider';
import Recipes from '../components/Recipes';

const mockMeals = [
  { idMeal: '52940', strMeal: 'Receita 1', strMealThumb: 'url-1' },
  { idMeal: '52941', strMeal: 'Receita 2', strMealThumb: 'url-2' },

];

const mockDrinks = [
  { idDrink: 1, strDrink: 'Bebida 1', strDrinkThumb: 'url-3' },
  { idDrink: 2, strDrink: 'Bebida 2', strDrinkThumb: 'url-4' },
];
describe('Recipe Componente', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renderiza corretamente os cards de receita /meals', async () => {
    const mockSetDetailId = jest.fn();

    jest.spyOn(React, 'useContext').mockReturnValue({
      recipes: mockMeals,
      setDetailId: mockSetDetailId,
      toggleRenderFiltered: false,
      toggleRenderRecomended: true,
      searchResults: [],
    });

    render(
      <MemoryRouter>
        <FoodProvider>
          <Recipes />
        </FoodProvider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('0-card-name')).toHaveTextContent('Receita 1');
    expect(screen.getByTestId('1-card-name')).toHaveTextContent('Receita 2');

    fireEvent.click(screen.getByTestId('0-recipe-card'));
    expect(mockSetDetailId).toHaveBeenCalledWith(mockMeals[0].idMeal);

    fireEvent.click(screen.getByTestId('1-recipe-card'));
    expect(mockSetDetailId).toHaveBeenCalledWith(mockMeals[1].idMeal);
  });

  test('renderiza corretamente os cards de receita /drinks', () => {
    const mockSetDetailId = jest.fn();

    jest.spyOn(React, 'useContext').mockReturnValue({
      recipes: mockDrinks, // Altera a lista de receitas para drinks
      setDetailId: mockSetDetailId,
      toggleRenderFiltered: false,
      toggleRenderRecomended: true,
      searchResults: [],
    });

    render(
      <MemoryRouter>
        <FoodProvider>
          <Recipes />
        </FoodProvider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('0-card-name')).toHaveTextContent('Bebida 1');
    expect(screen.getByTestId('1-card-name')).toHaveTextContent('Bebida 2');

    fireEvent.click(screen.getByTestId('0-recipe-card'));
    expect(mockSetDetailId).toHaveBeenCalledWith(mockDrinks[0].idDrink);
  });

  test('não renderiza os cards de receita quando toggleRenderRecomended é falso', () => {
    const mockSetDetailId = jest.fn();

    jest.spyOn(React, 'useContext').mockReturnValue({
      recipes: mockMeals,
      setDetailId: mockSetDetailId,
      toggleRenderFiltered: false,
      toggleRenderRecomended: false, // Definindo o toggleRenderRecomended como falso
      searchResults: [],
    });

    render(
      <MemoryRouter>
        <FoodProvider>
          <Recipes />
        </FoodProvider>
      </MemoryRouter>,
    );

    // Verifica se o componente não renderiza os cards de receita
    expect(screen.queryByTestId(/-recipe-card/i)).toBeNull();
  });
});
