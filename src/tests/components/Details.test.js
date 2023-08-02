import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Details from '../../components/Details';
import FoodProvider from '../../contexts/FoodProvider';

const clipboardCopyMock = jest.fn((text) => text);
jest.mock('clipboard-copy', () => jest.fn(() => 'Link copied!'));

describe('Componente Details', () => {
  beforeEach(() => {
    clipboardCopyMock.mockClear();
  });

  test('Verifica o comportamento do botão compartilhar', async () => {
    const info = {
    };
    const foodType = 'drinks';
    const index = 0;

    localStorage.setItem('favoriteHeart', JSON.stringify(true));

    render(
      <MemoryRouter>
        <FoodProvider>
          <Details
            info={ info }
            foodType={ foodType }
            index={ index }
          />
        </FoodProvider>
      </MemoryRouter>,
    );
    screen.debug();

    // Verificando botão de favoritos e seu comportamento
    const favoriteIcon = screen.getByTestId(/favorite-btn/i);
    expect(favoriteIcon).toHaveAttribute('src', 'whiteHeartIcon.svg');
    fireEvent.click(screen.getByTestId(/favorite-btn/i));
    expect(favoriteIcon).toHaveAttribute('src', 'blackHeartIcon.svg');

    const shareBtnElement = screen.getByTestId('share-btn');
    expect(shareBtnElement).toBeInTheDocument();

    // Simula o clique no botão de compartilhamento
    fireEvent.click(shareBtnElement);

    // Verifica se a mensagem de cópia é exibida após o clique
    const copyMessageElement = screen.getByText('Link copied!');
    expect(copyMessageElement).toBeInTheDocument();
  });
  test('Verifica se uma receita é adicionada à lista de favoritos quando ainda não está presente', () => {
    const info = {};
    const foodType = 'drinks';
    const index = 0;

    // Define um estado inicial onde não há receitas favoritas
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));

    render(
      <MemoryRouter>
        <FoodProvider>
          <Details
            info={ info }
            foodType={ foodType }
            index={ index }
          />
        </FoodProvider>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId(/favorite-btn/i));

    // Verifica se a receita foi adicionada corretamente à lista de favoritos
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favorites).toHaveLength(1);
    expect(favorites[0]).toEqual({
      id: info.idDrink || info.idMeal,
      type: foodType.slice(0, -1),
      nationality: info.strArea || '',
      category: info.strCategory || '',
      alcoholicOrNot: info.strAlcoholic || '',
      name: info.strDrink || info.strMeal,
      image: info.strMealThumb || info.strDrinkThumb,
    });
  });
  test('Verifica se uma receita não é adicionada à lista de favoritos se já estiver presente', () => {
    const info = {
      idDrink: '15997',
      strDrink: 'GG',
    };
    const foodType = 'drinks';
    const index = 0;

    // Define um estado inicial onde a receita já está na lista de favoritos
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: info.idDrink || info.idMeal,
      type: foodType.slice(0, -1),
      nationality: info.strArea || '',
      category: info.strCategory || '',
      alcoholicOrNot: info.strAlcoholic || '',
      name: info.strDrink || info.strMeal,
      image: info.strMealThumb || info.strDrinkThumb,
    }]));

    render(
      <MemoryRouter>
        <FoodProvider>
          <Details
            info={ info }
            foodType={ foodType }
            index={ index }
          />
        </FoodProvider>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId(/favorite-btn/i));

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favorites).toHaveLength(1);
  });
});
