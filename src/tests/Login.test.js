import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FoodProvider from '../contexts/FoodProvider';

import Login from '../pages/Login';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import localStorageMock from './helpers/localStorage';

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

  describe('Testando a página Profile', () => {
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
      expect(doneRecipes).toHaveAttribute('href', '/done-recipes');
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

      // Clica no primeiro card de receita (Recipe 1)
      fireEvent.click(screen.getByTestId('0-horizontal-image'));
      // Verifica se o redirecionamento ocorreu para a rota /meals/53069
      expect(history.location.pathname).toBe('/meals/53069');

      // Clica no segundo card de receita (Recipe 2)
      fireEvent.click(screen.getByTestId('1-horizontal-image'));
      // Verifica se o redirecionamento ocorreu para a rota /drinks/178319
      expect(history.location.pathname).toBe('/meals/53070');
    });
  });
  describe('Testando o componente Recipes', () => {
    test('Verificar se o redirecionamento para a página de detalhes funciona corretamente', async () => {
      const history = createMemoryHistory({ initialEntries: ['/meals/53069'] });
      const mockRecipes = [
        {
          idMeal: '1',
          strMeal: 'Recipe 1',
          strMealThumb: 'https://www.example.com/recipe1.jpg',
        },
        {
          idDrink: '1',
          strDrink: 'Recipe 2',
          strDrinkThumb: 'https://www.example.com/recipe2.jpg',
        },
      ];
      render(
        <Router history={ history }>
          <FoodProvider>
            <DoneRecipes />
          </FoodProvider>
        </Router>,
      );
      const firstElement = screen.getByTestId('0-horizontal-image');
      const secondElement = screen.getByTestId('1-horizontal-image');

      fireEvent.click(firstElement);
      expect(history.location.pathname).toBe('/meals/53069');
      screen.debug();
    });
  });
});
