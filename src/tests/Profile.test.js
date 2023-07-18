import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Profile from '../pages/Profile';

describe('Testando o arquivo Profile.js', () => {
  renderWithRouter(<App />);
  screen.debug();

  // Seleção de elementos - Login
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submitButton = screen.getByTestId('login-submit-btn');

  // Ações - Login
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: /password123/i } });
  fireEvent.click(submitButton);
  test('Teste se o arquivo Profile.js renderiza corretamente', async () => {
    // Renderiza componente Profile
    renderWithRouter(<Profile />);

    // Seleção - Profile
    const email = screen.getByTestId('profile-email');
    const doneBtn = screen.getByTestId('profile-done-btn');
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    // Verificação
    expect(email).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  test('testa se o botão de Logout funciona como esperado', () => {
    // Renderiza componente Profile
    const { history } = renderWithRouter(<Profile />);

    const logoutBtn = screen.getByTestId('profile-logout-btn');

    fireEvent.click(logoutBtn);

    expect(history.location.pathname).toBe('/');
  });
});
