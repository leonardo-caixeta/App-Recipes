import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { toast } from 'react-toastify';
import clipboardCopy from 'clipboard-copy';
import FoodProvider from '../contexts/FoodProvider';

import DoneRecipes from '../pages/DoneRecipes';
import DoneRecipesCards from '../components/DoneRecipesCards';

jest.mock('clipboard-copy');

describe('Componente DoneRecipeCard', () => {
  test('Verificando condicional para alerta', async () => {
    // Implementa o mock do clipboardCopy
    clipboardCopy.mockImplementationOnce(() => {});

    // Mock do toast.success
    jest.spyOn(toast, 'success').mockImplementationOnce(() => {});

    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <FoodProvider>
          <DoneRecipes>
            <DoneRecipesCards typeOfFilter="meal" />
          </DoneRecipes>
        </FoodProvider>
      </Router>,
    );

    await waitFor(() => {
      const shareButton = screen.getByTestId('0-horizontal-share-btn');
      expect(shareButton).toBeInTheDocument();

      // Simula o clique no botão de compartilhar
      fireEvent.click(shareButton);

      // Verifica se a função de copiar o link foi chamada e retorna o alerta com as caracteristicas esperadas
      expect(toast.success).toHaveBeenCalledWith('Link copied!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
      });

      // Verifica se a função de clipboardCopy foi chamada com a URL correta
      expect(clipboardCopy).toHaveBeenCalledWith('http://localhost:3000/meals/52771');
      expect(clipboardCopy).toHaveBeenCalledTimes(1);
    });
  });
  test('Verificar a renderização dos cards de receitas concluídas - Filtro All', async () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <FoodProvider>
          <DoneRecipes />
        </FoodProvider>
      </Router>,
    );

    await screen.findByTestId('0-horizontal-name');
    await screen.findByTestId('1-horizontal-name');

    expect(screen.getByTestId('0-horizontal-name')).toHaveTextContent('Spicy Arrabiata Penne');
    expect(screen.getByTestId('1-horizontal-name')).toHaveTextContent('Aquamarine');
  });

  describe('Testando o componente DoneRecipes', () => {
    test('Verificar a navegação da página', async () => {
      const history = createMemoryHistory({ initialEntries: ['/done-recipes'] });
      render(
        <Router history={ history }>
          <FoodProvider>
            <DoneRecipes />
          </FoodProvider>
        </Router>,
      );

      const filterAll = screen.getByTestId(/filter-by-all-btn/i);
      const filterMeals = screen.getByTestId(/filter-by-meal-btn/i);
      const filterDrinks = screen.getByTestId(/filter-by-drink-btn/i);
      const imageLinks = screen.getAllByTestId(/horizontal-image/i);
      const shareButtons = screen.getAllByTestId(/horizontal-share-btn/i);

      // Assertivas
      expect(imageLinks).toHaveLength(2);
      expect(shareButtons).toHaveLength(2);

      fireEvent.click(imageLinks[0]);
      expect(history.location.pathname).toBe('/meals/52771');

      // Utilizando o filtro All, Meals ou Drinks
      fireEvent.click(filterAll);
      const foodRecipe = screen.getByAltText(/Spicy Arrabiata Penne/i);
      const drinkRecipe = screen.getByAltText(/Aquamarine/i);
      expect(foodRecipe).toBeInTheDocument();
      expect(drinkRecipe).toBeInTheDocument();
      fireEvent.click(filterMeals);
      await waitFor(() => {
        expect(foodRecipe).toBeInTheDocument();
        expect(drinkRecipe).not.toBeInTheDocument();
        fireEvent.click(filterDrinks);
        expect(foodRecipe).not.toBeInTheDocument();
      });
    });
  });
});
