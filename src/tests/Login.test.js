import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

describe('Testando o arquivo Login.js', () => {
  test('Verificando email and password inputs', () => {
    render(
      <Router>
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
    screen.debug();
  });

  test('salva o email do usuário no localStorage quando o botão de envio é clicado', () => {
    render(
      <Router>
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
});
