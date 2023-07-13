import { screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import Provider from '../contexts/FoodProvider';
import renderWithRouter from '../renderWithRouter';

describe('Testando o arquivo Header.js', () => {
  test('Barra de busca não deve ser renderizada na tela antes do click', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Header title="Comidas" haveSearch />
      </Provider>,
    );
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    //     // Seleção
    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    // Ações
    fireEvent.click(searchIcon); // Clica no icone de busca
    const searchBar = screen.getByTestId('search-input');// Seleciona a barra de busca
    expect(searchBar).toBeInTheDocument(); // Verifica se a barra de busca está na tela
    fireEvent.click(searchIcon); // Clica novamente no icone de busca
    expect(searchBar).not.toBeInTheDocument(); // Verifica se a barra de busca não está na tela

    // Verificação
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  test('Verifica se os inputs se comportam da maneira esperada.', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Header title="Comidas" haveSearch />
      </Provider>,
    );

    const profileIcon = screen.getByTestId('profile-top-btn');
    fireEvent.click(profileIcon);

    const searchIconElement = screen.getByTestId('search-top-btn'); // Seleciona o icone de busca
    fireEvent.click(searchIconElement); // Clica no icone de busca  para que a barra de busca apareça
    const searchBar = screen.getByTestId('search-input'); // Seleciona a barra de busca
    fireEvent.change(searchBar, { target: { value: 'test' } }); // Digita 'test' na barra de busca
    expect(searchBar.value).toBe('test'); // Verifica se o valor digitado é 'test'

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
});
