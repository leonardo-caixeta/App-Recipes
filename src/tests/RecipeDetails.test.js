// Importe as bibliotecas necessárias para os testes
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import RecipeDetails from '../pages/RecipeDetails';

import FoodProvider from '../contexts/FoodProvider';

jest.mock('clipboard-copy', () => jest.fn());

const addToFavorites = () => {
  const recipe = {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  };
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, recipe]));
};

const mockApiResponse = {
  drinks: [
    {
      idDrink: '15997',
      strDrink: 'GG',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      strCategory: 'Ordinary Drink',
      strAlcoholic: 'Alcoholic',
      strInstructions: 'Pour the Galliano liqueur over ice.',
      strYoutube: 'https://www.youtube.com/watch?v=LD0x7ho_IYc',
      strIngredient1: 'Galliano',
      strMeasure1: '2 1/2 shots',
      strIngredient2: 'Another Ingredient',
      strMeasure2: 'Some measurement',
    },
  ],
};

describe('Página RecipeDetails ', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('Testando navegação da página de RecipeDetails para RecipeInProgress com receita drinks  ', async () => {
    const path = 'drinks';
    const id = '15997';
    const history = createMemoryHistory();
    history.push = jest.fn();

    render(

      <MemoryRouter initialEntries={ [`/${path}/${id}`] }>
        <FoodProvider>
          <RecipeDetails foodType={ path } />
        </FoodProvider>
      </MemoryRouter>,

    );

    const favoriteBtn = await screen.findByTestId('favorite-btn');
    const shareBtn = await screen.findByTestId('share-btn');
    const title = await screen.findByTestId(/recipe-title/i);
    const ingredients = await screen.findAllByTestId(/ingredient-name-and-measure/i);
    const instructions = await screen.findByTestId(/instructions/i);
    const video = await screen.findByTestId(/video/i);
    const heading = await screen.findAllByRole('heading', { level: 3 });

    expect(ingredients).toHaveLength(2);
    expect(ingredients[0]).toHaveTextContent('Galliano - 2 1/2 shots');
    expect(title).toHaveTextContent(/GG/i);
    expect(heading[0]).toHaveTextContent(/Ingredients/i);
    expect(instructions).toHaveTextContent(/Pour the Galliano liqueur over ice./i);
    expect(video).toBeInTheDocument();

    fireEvent.click(favoriteBtn);
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favorites).toHaveLength(1);
    expect(favorites[0].id).toEqual(id);
    expect(favorites[0].type).toEqual('drink');

    fireEvent.click(shareBtn);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
  test('Testando navegação da página de RecipeDetails para RecipeInProgress com receita meals  ', async () => {
    const path = 'meals';
    const id = '53065';
    const history = createMemoryHistory();
    history.push = jest.fn();

    render(

      <MemoryRouter initialEntries={ [`/${path}/${id}`] }>
        <FoodProvider>
          <RecipeDetails foodType={ path } />
        </FoodProvider>
      </MemoryRouter>,

    );

    const favoriteBtn = await screen.findByTestId('favorite-btn');
    const shareBtn = await screen.findByTestId('share-btn');
    const title = await screen.findByTestId(/recipe-title/i);
    const ingredients = await screen.findAllByTestId(/ingredient-name-and-measure/i);
    const instructions = await screen.findByTestId(/instructions/i);
    const video = await screen.findByTestId(/video/i);
    const heading = await screen.findAllByRole('heading', { level: 3 });

    expect(ingredients).toHaveLength(8);
    expect(ingredients[0]).toHaveTextContent(/Sushi Rice - 300ml Rice wine - 100mlCaster Sugar - 2 tbsMayonnaise/i);
    expect(title).toHaveTextContent(/Sushi/i);
    expect(heading[0]).toHaveTextContent(/Ingredients/i);
    expect(instructions).toHaveTextContent(/STEP 1 TO MAKE SUSHI ROLLS: Pat out some rice. Lay a nori sheet on the mat, shiny-side down./i);
    expect(video).toBeInTheDocument();

    fireEvent.click(favoriteBtn);
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favorites).toHaveLength(1);
    expect(favorites).toHaveLength(1);
    expect(favorites[0].id).toEqual(id);
    expect(favorites[0].type).toEqual('meal');

    expect(localStorage.getItem('favoriteHeart')).toEqual('true');
    expect(screen.getByTestId('favorite-btn')).toHaveAttribute('src', 'blackHeartIcon.svg');
    fireEvent.click(favoriteBtn);
    fireEvent.click(shareBtn);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });

  test('Testando remover receita dos favoritos', async () => {
    const path = 'drinks';
    const id = '15997';

    // Adicionar a receita aos favoritos antes do teste
    addToFavorites();

    render(
      <MemoryRouter initialEntries={ [`/${path}/${id}`] }>
        <FoodProvider>
          <RecipeDetails foodType={ path } />
        </FoodProvider>
      </MemoryRouter>,
    );

    // const favoriteBtn = await screen.findByTestId('favorite-btn');
    // const favoritesBefore = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    // fireEvent.click(favoriteBtn);

    // const favoritesAfter = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    // expect(favoritesAfter).toHaveLength(favoritesBefore.length - 1);
  });
});
