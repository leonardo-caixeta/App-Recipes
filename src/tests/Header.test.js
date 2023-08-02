import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FoodProvider from '../contexts/FoodProvider';
import renderWithRouter from '../renderWithRouter';
import FoodContext from '../contexts/FoodContext';

import Header from '../components/Header';

describe('Testando o arquivo Header.js', () => {
  test('Barra de busca não deve ser renderizada na tela antes do click', () => {
    const { history } = renderWithRouter(
      <MemoryRouter>
        <FoodProvider>
          <Header title="meals" haveSearch />
        </FoodProvider>
        ,
      </MemoryRouter>,
    );
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    //     // Seleção
    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    // Ações
    fireEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
    fireEvent.click(searchIcon);
    expect(searchBar).not.toBeInTheDocument();

    // Verificação
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  test('Define imgUrl com incone de favoritos quando recipeType for \'favorite\'', () => {
    const mockContextValue = {
      recipeType: 'favorite',
    };

    render(
      <MemoryRouter>
        <FoodContext.Provider value={ mockContextValue }>
          <Header haveSearch title="Test Title" />
        </FoodContext.Provider>
        ,
      </MemoryRouter>,
    );

    const favoritesIconElement = screen.getByAltText('Ícone da página de favorite');
    expect(favoritesIconElement.src).toContain('favoritesIcon.svg');
  });

  test('Define imgUrl com doneIcon quando recipeType for \'done\'', () => {
    const mockContextValue = {
      recipeType: 'done',
    };

    render(
      <MemoryRouter>
        <FoodContext.Provider value={ mockContextValue }>
          <Header haveSearch title="Test Title" />
        </FoodContext.Provider>
      </MemoryRouter>,
    );

    const doneIconElement = screen.getByAltText('Ícone da página de done');
    expect(doneIconElement.src).toContain('doneIcon.svg');
  });
});
