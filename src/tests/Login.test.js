import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import FoodProvider from '../contexts/FoodProvider';

import Login from '../pages/Login';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import localStorageMock from './helpers/localStorageMock';
import Categories from '../components/Categories';
import Meals from '../pages/Meals';

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
});

describe('Testando o arquivo Login.js', () => {
  test('Verificando email and password inputs', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });

    render(
      <Router history={ history }>
        <Login />
      </Router>,
    );

    // Seleção de elementos
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');
    expect(submitButton).toBeDisabled();

    // ações
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: /password123/i } });
    fireEvent.click(submitButton);

    // Assertivas
    expect(submitButton).toBeEnabled();
  });

  test('salva o email do usuário no localStorage quando o botão de envio é clicado', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    render(
      <Router history={ history }>
        <Login />
      </Router>,

    );

    // Seleção de elementos
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    // ações
    fireEvent.change(emailInput, { target: { value: 'text@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    const user = JSON.parse(localStorage.getItem('user'));
    expect(user).toEqual({ email: 'text@example.com' });
  });

  // VOLTAR PARA ESTE TESTE E VERIFICAR AS CATEGORIAS
  describe('Testando a página -----', () => {
    test('', async () => {
      jest.mock('../helper/api');

      // const mealsMock = [
      //   { strCategory: 'Beef' },
      //   { strCategory: 'Breakfast' },
      //   { strCategory: 'Chicken' },
      //   { strCategory: 'Dessert' },
      //   { strCategory: 'Goat' },
      // ];

      const history = createMemoryHistory({ initialEntries: ['/meals'] });

      render(
        <Router history={ history }>
          <FoodProvider>
            <Meals>
              <Categories />
            </Meals>
          </FoodProvider>
        </Router>,
      );

      const drinkButton = screen.getByTestId(/drinks-bottom-btn/i);
      fireEvent.click(drinkButton);
      expect(history.location.pathname).toBe('/drinks');

      // const drinkCategoriesButton1 = await screen.findByTestId(/Ordinary Drink-category-filter/i);

      // const cateroriesButtons = screen.getAllByTestId(/category-filter'/i);
      // expect(categoryButtons).toHaveLength(5);
      screen.debug();
      // });
    });

    test('Verificando se as informações obtidas no login estão presentes no Profile.', async () => {
      const history = createMemoryHistory({ initialEntries: ['/profile'] });
      render(
        <Router history={ history }>
          <FoodProvider>
            <Profile />
          </FoodProvider>
        </Router>,
      );

      // Seleção de elementos
      const titleProfile = screen.getByTestId(/page-title/i);
      const doneRecipes = screen.getByTestId(/profile-done-btn/i);
      const favoriteRecipes = screen.getByTestId(/profile-favorite-btn/i);
      const logout = screen.getByTestId(/profile-logout-btn/i);
      const drinkButton = screen.getByTestId(/drinks-bottom-btn/i);
      const mealsButton = screen.getByTestId(/meals-bottom-btn/i);
      // Ações do usuário
      fireEvent.click(doneRecipes);

      expect(history.location.pathname).toBe('/done-recipes');
      // Assertivas;
      expect(titleProfile).toBeInTheDocument();
      expect(screen.getByTestId('profile-email')).toBeInTheDocument();
      expect(screen.getByTestId('profile-email')).toHaveTextContent(/text@example.com/i);
      expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
      expect(favoriteRecipes).toHaveAttribute('href', '/favorite-recipes');
      expect(logout).toHaveAttribute('href', '/');
      expect(drinkButton).toBeInTheDocument();
      expect(mealsButton).toBeInTheDocument();
    });
    test('Verificar se handleLogout limpa o localStorage corretamente', () => {
      const history = createMemoryHistory({ initialEntries: ['/profile'] });

      render(
        <Router history={ history }>
          <FoodProvider>
            <Profile />
          </FoodProvider>
        </Router>,
      );

      const removeItemSpy = jest.spyOn(localStorage, 'removeItem');

      // Seleção de elementos
      const logout = screen.getByTestId(/profile-logout-btn/i);
      fireEvent.click(logout);

      // Assertivas
      expect(removeItemSpy).toHaveBeenCalledTimes(4);
      expect(removeItemSpy).toHaveBeenCalledWith('user');
      expect(removeItemSpy).toHaveBeenCalledWith('doneRecipes');
      expect(removeItemSpy).toHaveBeenCalledWith('favoriteRecipes');
      expect(removeItemSpy).toHaveBeenCalledWith('inProgressRecipes');
    });
  });

  describe('Testando a rota done-recipes', () => {
    test('Verificar se o redirecionamento para a página de detalhes funciona corretamente', async () => {
      const history = createMemoryHistory({ initialEntries: ['/done-recipes'] });
      render(
        <Router history={ history }>
          <FoodProvider>
            <DoneRecipes />
          </FoodProvider>
        </Router>,
      );

      // Clica no botão de compartilhar e localiza o elemento 'alert'
      const shareButton = screen.getByTestId('0-horizontal-share-btn');
      fireEvent.click(shareButton);
      expect(await screen.findAllByRole('alert')).toHaveLength(2);
    });
    screen.debug();
  });
  describe('Testando o componente DoneRecipes', () => {
    test('Verificar se o redirecionamento para a página de detalhes funciona corretamente', async () => {
      const history = createMemoryHistory({ initialEntries: ['/meals/53069'] });
      const recipeType = 'meal';
      const meals = [
        {
          idMeal: '53069',
          strMeal: 'Bistek',
          strCategory: 'Beef',
          strArea: 'Filipino',
        },
      ];
      render(
        <Router history={ history }>
          <FoodProvider>
            <DoneRecipes />
          </FoodProvider>
        </Router>,
      );

      const firstElement = screen.getByTestId('1-horizontal-image');
      fireEvent.click(firstElement);

      const line157Element = screen.getAllByTestId('0-horizontal-top-text');

      const expectedPath = recipeType === 'meal' ? ` /${recipeType}s/${meals[0].idMeal}` : `/${recipeType}s/${meals[0].idDrink}`;

      meals.forEach((meal, index) => {
        const cardName = screen.getAllByTestId(`${index}-horizontal-name`);
        const cardCategory = screen.getAllByTestId(`${index}-horizontal-top-text`);

        expect(cardName[0]).toHaveTextContent(meal.strMeal);
        expect(cardCategory[0]).toHaveTextContent(meal.strCategory);
        expect(cardCategory[1])
          .toHaveTextContent(`${meal.strArea} - ${meal.strCategory}`);
        expect(history.location.pathname).toBe('/meals/53070');
        expect(line157Element[1].textContent).toBe('Filipino  -  Beef');
        expect(expectedPath).toBe(' /meals/53069');
      });
    });
  });
});
