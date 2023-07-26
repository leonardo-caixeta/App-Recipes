import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router, Route, useHistory } from 'react-router-dom';
import { createMemoriHistory } from 'history';
import localStorageFavoriteMock from './helpers/localStorageFavoriteMock';
import clipboardy from './helpers/clipboard';
import renderWithRouter from '../renderWithRouter';

import FavoriteRecipes from '../pages/FavoriteRecipes';
import FoodProvider from '../contexts/FoodProvider';

const category1 = 'Category 1';
const recipeImg0 = '0-horizontal-image';
const recipeImg1 = '1-horizontal-image';
const filterDrinkBtn = 'filter-by-drink-btn';
const filterMealBtn = 'filter-by-meal-btn';

jest.mock('clipboardy');
describe('FavoriteRecipes component', () => {
  beforeEach(() => {
    // Mock do localStorage para retornar dados de teste
    Object.defineProperty(window, 'localStorage', { value: localStorageFavoriteMock });
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      { id: '1', type: 'meal', name: 'Recipe 1', category: category1, image: 'recipe1.jpg' },
      { id: '2', type: 'drink', name: 'Recipe 2', alcoholicOrNot: 'Alcoholic', image: 'recipe2.jpg' },
    ]));
  });

  afterEach(() => {
    // Restaura o localStorage após cada teste
    global.localStorage.clear();
  });

  test('Deve renderizar corretamente as receitas favoritas', () => {
    render(
      <FoodProvider>
        <MemoryRouter>
          <FavoriteRecipes />
        </MemoryRouter>
      </FoodProvider>,

    );

    // Verifica se os elementos das receitas favoritas são renderizados corretamente
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId(filterMealBtn)).toBeInTheDocument();
    expect(screen.getByTestId(filterDrinkBtn)).toBeInTheDocument();
    expect(screen.getByText('Recipe 1')).toBeInTheDocument();
    expect(screen.getByText(category1)).toBeInTheDocument();
    expect(screen.getByText('Recipe 2')).toBeInTheDocument();
    expect(screen.getByText('Alcoholic')).toBeInTheDocument();
    expect(screen.getByTestId(recipeImg0)).toBeInTheDocument();
    expect(screen.getByTestId(recipeImg1)).toBeInTheDocument();
  });

  test('Deve filtrar apenas as receitas de comidas ao clicar no botão "Meals"', () => {
    render(
      <FoodProvider>
        <MemoryRouter>
          <FavoriteRecipes />
        </MemoryRouter>
        ,
      </FoodProvider>,
    );

    fireEvent.click(screen.getByTestId(filterMealBtn));

    // Verifica se apenas as receitas de comidas são renderizadas
    expect(screen.queryByText('Recipe 1')).toBeInTheDocument();
    expect(screen.queryByText(category1)).toBeInTheDocument();
    expect(screen.queryByText('Recipe 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Alcoholic')).not.toBeInTheDocument();
    expect(screen.queryByTestId(recipeImg0)).toBeInTheDocument();
    expect(screen.queryByTestId(recipeImg1)).not.toBeInTheDocument();
  });

  test('Deve filtrar apenas as receitas de bebidas ao clicar no botão "Drinks"', () => {
    render(

      <FoodProvider>
        <MemoryRouter>
          <FavoriteRecipes />
        </MemoryRouter>
      </FoodProvider>,
    );
    screen.debug();
    fireEvent.click(screen.getByTestId(filterDrinkBtn));

    // Verifica se apenas as receitas de bebidas são renderizadas
    expect(screen.queryByText('Recipe 1')).not.toBeInTheDocument();
    expect(screen.queryByText(category1)).not.toBeInTheDocument();
    expect(screen.queryByText('Recipe 2')).toBeInTheDocument();
    expect(screen.queryByText('Alcoholic')).toBeInTheDocument();

    // CONTINUAR O PROGRESSO NESTE TESTE

    // expect(screen.getByText('No favorite recipes found')).toBeInTheDocument();
    // fireEvent.click(screen.getByTestId('0-horizontal-share-btn'));

    // if (screen.queryByTestId(recipeImg1)) {
    //   expect(screen.queryByTestId(recipeImg0)).not.toBeInTheDocument();
    // }
  });
  test('Deve incluir no localStorage a chave "inProgressRecipes" com o id e a chave "cocktails" com um array vazio ao clicar no botão "Start Recipe"', () => {
    const { history } = renderWithRouter(
      <FoodProvider>
        <MemoryRouter>
          <FavoriteRecipes />
        </MemoryRouter>
      </FoodProvider>,

    );

    fireEvent.click(screen.getByTestId('0-horizontal-image'));
    fireEvent.click(screen.getByTestId('0-horizontal-favorite-btn'));

    // Verifica se o localStorage foi atualizado corretamente com a chave favoriteRecipes
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toHaveLength(1);
    expect(favoriteRecipes[0].id).toBe('2');
    expect(favoriteRecipes[0].type).toBe('drink');
    expect(favoriteRecipes[0].name).toBe('Recipe 2');
    expect(favoriteRecipes[0].alcoholicOrNot).toBe('Alcoholic');
    expect(favoriteRecipes[0].image).toBe('recipe2.jpg');

    history.push('/favorite-recipes');

    expect(screen.getByText('Recipe 2')).toBeInTheDocument();
    // Verifica se a receita foi removida da tela
    expect(screen.queryByText('Recipe 1')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('filter-by-all-btn'));
    expect(screen.getByText('Recipe 2')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId(filterMealBtn));
    expect(screen.queryByText('Recipe 2')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId(filterDrinkBtn));
    expect(screen.getByText('Recipe 2')).toBeInTheDocument();
  });
});
