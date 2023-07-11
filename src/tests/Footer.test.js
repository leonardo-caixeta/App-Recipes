import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Footer from '../components/Footer';

describe('Testando o arquivo Footer.js', () => {
  test('Teste se o arquivo Footer.js renderiza corretamente', () => {
    renderWithRouter(<Footer />);
    screen.debug();

    // Seleção
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    const mealBtn = screen.getByTestId('meals-bottom-btn');

    // Verificação
    expect(drinkBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
  });
});
