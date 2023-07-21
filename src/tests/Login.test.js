import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import FoodProvider from '../contexts/FoodProvider';

import Login from '../pages/Login';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import localStorageMock from './helpers/localStorageMock';

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
});

describe('Testando o página de Login.js', () => {
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
    render(
      <Router history={ createMemoryHistory({ initialEntries: ['/'] }) }>
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
  describe('Testando a página Profile', () => {
    test('Verificando se as informações obtidas no login estão presentes no Profile.', async () => {
      render(
        <Router history={ createMemoryHistory({ initialEntries: ['/profile'] }) }>
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

      // Assertivas;
      expect(titleProfile).toBeInTheDocument();
      expect(screen.getByTestId(/profile-email/i)).toBeInTheDocument();
      expect(screen.getByTestId(/profile-email/i)).toHaveTextContent(/text@example.com/i);
      expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
      expect(favoriteRecipes).toHaveAttribute('href', '/favorite-recipes');
      expect(logout).toHaveAttribute('href', '/');
      expect(drinkButton).toBeInTheDocument();
      expect(mealsButton).toBeInTheDocument();
    });
    test('Verificar se handleLogout limpa o localStorage corretamente', () => {
      render(
        <Router history={ createMemoryHistory({ initialEntries: ['/profile'] }) }>
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
      // Seleção de elementos da página DONE RECIPES
      const doneRecipesTitle = screen.getByTestId(/page-title/i);
      const filterAll = screen.getByTestId(/filter-by-all-btn/i);
      const filterMeals = screen.getByTestId(/filter-by-meal-btn/i);
      const filterDrinks = screen.getByTestId(/filter-by-drink-btn/i);
      const imageLinks = screen.getAllByTestId(/horizontal-image/i);
      const shareButtons = screen.getAllByTestId(/horizontal-share-btn/i);

      // Assertivas
      expect(imageLinks).toHaveLength(2);
      expect(shareButtons).toHaveLength(2);

      if (fireEvent.click(imageLinks[0])) {
        expect(history.location.pathname).toBe('/meals/52771');
        expect(imageLinks[0]).toHaveTextContent('Spicy Arrabiata Penne');
        expect(imageLinks[0]).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/1529444830.jpg');
        expect(shareButtons[0]).toHaveAttribute('src', 'http://localhost/meals/52771');
      } else if (fireEvent.click(imageLinks[1])) {
        expect(history.location.pathname).toBe('/drinks/178319');
        expect(imageLinks[1]).toHaveTextContent('Aquamarine');
        expect(imageLinks[1]).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
        expect(shareButtons[1]).toHaveAttribute('src', 'http://localhost/drinks/178319');
      }
      history.push('/done-recipes');

      // Ações do usuário - Filtros
      if (fireEvent.click(filterAll)) {
        expect(imageLinks).toHaveLength(2);
      } else if (fireEvent.click(filterMeals)) {
        expect(imageLinks).toHaveLength(1);
        expect(shareButtons).toHaveLength(1);
      } else if (fireEvent.click(filterDrinks)) {
        expect(imageLinks).toHaveLength(1);
      }

      expect(doneRecipesTitle).toHaveTextContent(/Done Recipes/i);

      // Ações do usuário ao clicar no botão compartilhar
    });
  });
});
