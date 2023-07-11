import { screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import renderWithRouter from '../renderWithRouter';

describe('Testando o arquivo Header.js', () => {
  test('Teste se o arquivo Header.js renderiza corretamente', () => {
    renderWithRouter(<Header title="Comidas" haveSearch />);
    screen.debug();

    // Seleção
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

  test('Verifica se ao clicar no icone de perfil, o usuário é redirecionado para a página de perfil', () => {
    const { history } = renderWithRouter(<Header title="Comidas" haveSearch />);

    const profileIcon = screen.getByTestId('profile-top-btn');
    fireEvent.click(profileIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
});
