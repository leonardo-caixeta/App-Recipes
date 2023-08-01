import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router';
import SearchBar from '../components/SearchBar';

import FoodContext from '../contexts/FoodContext';
import FetchDrinks from '../funcs/FetchDrinks';
import FetchMeals from '../funcs/FetchMeals';

const mockFetchDrinks = jest.fn();
const mockFetchMeals = jest.fn();
jest.mock('../funcs/FetchDrinks', () => jest.fn(() => mockFetchDrinks()));
jest.mock('../funcs/FetchMeals', () => jest.fn(() => mockFetchMeals()));

const initialFoodContext = {
  searchResults: { meals: null },
  setSearchType: jest.fn(),
  setSearchInput: jest.fn(),
  searchInput: '',
  searchType: '',
  toggleRenderRecomended: false,
  setToggleRenderRecomended: jest.fn(),
};
describe('Componente SearchBar', () => {
  let mockFoodContext;

  beforeEach(() => {
    mockFoodContext = { ...initialFoodContext };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renderiza o input de busca', () => {
    render(
      <FoodContext.Provider value={ mockFoodContext }>
        <SearchBar food="meals" />
      </FoodContext.Provider>,
    );
    const searchInput = screen.getByTestId(/search-input/);
    expect(searchInput).toBeInTheDocument();
  });

  test('seleciona a opção de busca corretamente', () => {
    render(
      <FoodContext.Provider value={ mockFoodContext }>
        <SearchBar food="meals" />
      </FoodContext.Provider>,
    );
    const nameSearchRadio = screen.getByTestId(/name-search-radio/);
    fireEvent.click(nameSearchRadio);
    expect(mockFoodContext.setSearchType).toHaveBeenCalledWith('name');
  });

  test('executa FetchDrinks quando o food é "drinks"', async () => {
    render(
      <FoodContext.Provider value={ mockFoodContext }>
        <SearchBar food="drinks" />
      </FoodContext.Provider>,
    );
    const execSearchButton = screen.getByText(/Buscar/i);
    fireEvent.click(execSearchButton);
    expect(FetchDrinks).toHaveBeenCalledTimes(1);
    expect(FetchMeals).toHaveBeenCalledTimes(0);
  });

  test('alerta o usuário quando a busca não encontra correspondência', async () => {
    const alertMock = jest.fn();
    global.alert = alertMock;

    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <FoodContext.Provider value={ mockFoodContext }>
          <SearchBar food="meals" />
        </FoodContext.Provider>
        ,
      </MemoryRouter>,

    );
    screen.debug();

    const execSearchButton = screen.getByText(/Buscar/i);
    const ingredientRadio = screen.getByTestId(/ingredient-search-radio/i);

    fireEvent.click(ingredientRadio);
    fireEvent.click(execSearchButton);
    expect(alertMock).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });

  test('alerta o usuário quando a busca por primeira letra tem mais de um caracter', () => {
    const mockFoodContextFirstLetter = {
      searchResults: { meals: null },
      setSearchType: jest.fn(),
      setSearchInput: jest.fn(),
      searchInput: 'ab', // Definindo searchInput com mais de um caractere
      searchType: 'letter', // Definindo searchType como 'letter'
      toggleRenderRecomended: false,
      setToggleRenderRecomended: jest.fn(),
    };

    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <FoodContext.Provider value={ mockFoodContextFirstLetter }>
          <SearchBar food="meals" />
        </FoodContext.Provider>
        ,
      </MemoryRouter>,

    );

    const execSearchButton = screen.getByText(/Buscar/i);
    fireEvent.click(execSearchButton);

    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  test('altera o tipo de busca corretamente', async () => {
    render(
      <FoodContext.Provider value={ mockFoodContext }>
        <SearchBar food="drinks" />
      </FoodContext.Provider>,
    );

    const ingredientRadio = screen.getByTestId(/ingredient-search-radio/i);
    const nameRadio = screen.getByTestId(/name-search-radio/i);
    const firstLetterRadio = screen.getByTestId(/first-letter-search-radio/i);

    fireEvent.click(ingredientRadio);
    expect(mockFoodContext.setSearchType).toHaveBeenCalledWith('ingredient');

    fireEvent.click(nameRadio);
    expect(mockFoodContext.setSearchType).toHaveBeenCalledWith('name');

    fireEvent.click(firstLetterRadio);
    expect(mockFoodContext.setSearchType).toHaveBeenCalledWith('letter');
  });
});
