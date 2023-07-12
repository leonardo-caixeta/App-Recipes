import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Recipes from '../components/Recipes';
import Categories from '../components/Categories';
import FoodContext from '../contexts/FoodContext';
import FoodProvider from '../contexts/FoodProvider';

describe('Categories component', () => {
  test('renders category buttons with correct data', () => {
    // Mock do contexto de comidas
    const categories = [
      { id: 1, strCategory: 'Category 1' },
      { id: 2, strCategory: 'Category 2' },
    ];

    // Renderiza o componente Categories com o mock do contexto
    render(
      <FoodContext.Provider value={ { categories } }>
        <Categories />
      </FoodContext.Provider>,
    );

    // Verifica se os botões de categoria foram renderizados com os dados corretos
    expect(screen.getByTestId('Category 1-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Category 1-category-filter')).toHaveTextContent('Category 1');

    expect(screen.getByTestId('Category 2-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('Category 2-category-filter')).toHaveTextContent('Category 2');
  });
  test('renders recipe cards after data is loaded', async () => {
    // Mock Dados da receita
    const recipes = [
      { id: 1, strMeal: 'Recipe 1', strMealThumb: 'image1.jpg' },
      { id: 2, strMeal: 'Recipe 2', strMealThumb: 'image2.jpg' },
    ];

    // Mock da função fetch para os dados das receitas
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        meals: recipes,
      }),
    }));

    // Renderiza o recipes sem os dados
    render(
      <FoodContext.Provider value={ { recipes: [], categories: [] } }>
        <Recipes />
      </FoodContext.Provider>,
    );

    expect(screen.queryByTestId(/recipe-card/i)).toBeNull();

    // Espera pelo próximo load e re-renderiza o componente
    await act(async () => {
      render(
        <FoodContext.Provider value={ { recipes, categories: [] } }>
          <Recipes />
        </FoodContext.Provider>,
      );
    });

    // assertivas para o carregamento dos dados
    expect(screen.getAllByTestId(/recipe-card/i)).toHaveLength(recipes.length);
  });
  beforeEach(() => {
    // Mock do retorno da função fetch para os dados das receitas
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: async () => ({
        meals: [{ id: 1, name: 'Receita 1' }, { id: 2, name: 'Receita 2' }],
      }),
    });
  });
  afterEach(() => jest.restoreAllMocks());
  test('Deve renderizar a lista de receitas', async () => {
    await act(async () => {
      render(
        <FoodProvider>
          <Recipes />
        </FoodProvider>,
      );
    });

    const recipe1 = screen.getByTestId('0-recipe-card');
    const recipe2 = screen.getByTestId('1-recipe-card');

    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
  });
});
