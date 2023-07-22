import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import FoodProvider from '../contexts/FoodProvider';

import Login from '../pages/Login';
import Profile from '../pages/Profile';

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
});
