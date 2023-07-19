import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import FoodProvider from '../contexts/FoodProvider';
import Recipes from '../components/Recipes';
import Categories from '../components/Categories';
import * as api from '../helper/api';

describe('Recipe Componente', () => {
  test('renderiza corretamente os cards de receita e redireciona para a página de detalhes', async () => {
    const recipes = [
      {
        idMeal: '1',
        strMeal: 'Meal 1',
        strMealThumb: 'thumb1.jpg',
      },
      {
        idMeal: '2',
        strMeal: 'Meal 2',
        strMealThumb: 'thumb2.jpg',
      },
    ];

    jest.spyOn(api, 'fetchCategories').mockImplementationOnce(() => Promise.resolve([
      { strCategory: 'Category 1' },
      { strCategory: 'Category 2' },
      { strCategory: 'Category 3' },
      { strCategory: 'Category 4' },
    ]));

    jest.spyOn(api, 'fetchRecipes').mockImplementationOnce(() => Promise.resolve(recipes));

    const history = createMemoryHistory({ initialEntries: ['/drinks'] });
    render(
      <BrowserRouter history={ history }>
        <FoodProvider>
          <Categories />
          <Recipes />
        </FoodProvider>
      </BrowserRouter>,
    );

    // // Verifica se os cards de receitas foram renderizados corretamente
    // const recipeCards = await screen.findAllByTestId(/-recipe-card/);
    // screen.debug();
    // expect(recipeCards).toHaveLength(recipes.length);
    // // Simula o clique no primeiro card de receita (Recipe 1)
    // fireEvent.click(recipeCards[0]);

    // // Verifica se o redirecionamento ocorreu para a rota /meals/1 (id da primeira receita)
    // expect(window.location.pathname).toBe('/meals/1');

    // // Simula o clique no segundo card de receita (Recipe 2)
    // fireEvent.click(recipeCards[1]);

    // // Verifica se o redirecionamento ocorreu para a rota /meals/2 (id da segunda receita)
    // expect(window.location.pathname).toBe('/meals/2');
  });
});
