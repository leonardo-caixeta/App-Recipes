import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, useHistory } from 'react-router-dom';
import FirstRecipes from '../components/FirstRecipes';
import FoodContext from '../contexts/FoodContext';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

describe('FirstRecipes', () => {
  test('deve redirecionar para a rota correta quando há apenas uma receita no contexto', () => {
    const mockedHistoryPush = jest.fn();
    useHistory.mockReturnValue({
      push: mockedHistoryPush,
    });

    const searchResults = {
      meals: [
        {
          idMeal: '1',
          strMeal: 'Receita 1',
          strMealThumb: 'imagem1.jpg',
        },
      ],
    };

    render(
      <MemoryRouter>
        <FoodContext.Provider value={ { searchResults } }>
          <FirstRecipes />
        </FoodContext.Provider>
      </MemoryRouter>,
    );

    act(() => {}); // Aguarda a execução do useEffect

    expect(mockedHistoryPush).toHaveBeenCalledWith('/meals/1');
    expect(window.location.pathname).toBe('/');
  });
  test('deve renderizar o componente MapedRecipes com as receitas corretas', () => {
    const searchResults = {
      meals: [
        {
          idMeal: '1',
          strMeal: 'Receita 1',
          strMealThumb: 'imagem1.jpg',
        },
        {
          idMeal: '2',
          strMeal: 'Receita 2',
          strMealThumb: 'imagem2.jpg',
        },
      ],
    };
    render(
      <MemoryRouter>
        <FoodContext.Provider value={ { searchResults } }>
          <FirstRecipes />
        </FoodContext.Provider>
      </MemoryRouter>,
    );

    screen.debug();

    const recipeCards = screen.getAllByTestId(/recipe-card/i);
    fireEvent.click(recipeCards[0]);
    expect(recipeCards.length).toBe(2);
  });
  test('não deve redirecionar quando há mais de uma receita no contexto', async () => {
    const mockedHistoryPush = jest.fn();
    useHistory.mockReturnValue({
      push: mockedHistoryPush,
    });

    const searchResults = {
      meals: [
        {
          idMeal: '1',
          strMeal: 'Receita 1',
        },
        {
          idMeal: '2',
          strMeal: 'Receita 2',
        },
      ],
    };

    render(
      <MemoryRouter>
        <FoodContext.Provider value={ { searchResults } }>
          <FirstRecipes />
        </FoodContext.Provider>
      </MemoryRouter>,
    );

    // Aguarda a execução do useEffect
    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });
});
