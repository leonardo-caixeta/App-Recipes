import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { toast } from 'react-toastify';
import clipboardCopy from 'clipboard-copy';
import FoodProvider from '../contexts/FoodProvider';
// import localStorageMock from './helpers/localStorageMock';

import DoneRecipes from '../pages/DoneRecipes';
import DoneRecipesCards from '../components/DoneRecipesCards';

jest.mock('clipboard-copy');

describe('Componente DoneRecipeCard', () => {
  test('Verificando condicional para alerta', async () => {
    // Implementa o mock do clipboardCopy
    clipboardCopy.mockImplementationOnce(() => {});

    // Mock do toast.success
    jest.spyOn(toast, 'success').mockImplementationOnce(() => {});

    const history = createMemoryHistory({ initialEntries: ['/done-recipes'] });
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
    // const mockDoneRecipes = [
    //   {
    //     idMeal: '52771',
    //     type: 'meal',
    //     strArea: 'Italian',
    //     strCategory: 'Vegetarian',
    //     alcoholicOrNot: '',
    //     strMeal: 'Spicy Arrabiata Penne',
    //     strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    //     doneDate: '23/06/2020',
    //     strTags: ['Pasta', 'Curry'],
    //   },
    //   {
    //     idDrink: '178319',
    //     type: 'drink',
    //     strArea: '',
    //     strCategory: 'Cocktail',
    //     alcoholicOrNot: 'Alcoholic',
    //     strDrink: 'Aquamarine',
    //     strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    //     doneDate: '23/06/2020',
    //     strTags: [],
    //   },
    // ];

    const history = createMemoryHistory({ initialEntries: ['/done-recipes'] });

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
});
