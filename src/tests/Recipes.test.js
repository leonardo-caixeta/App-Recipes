import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Recipes from '../components/Recipes';
import FoodContext from '../contexts/FoodContext';
import FoodProvider from '../contexts/FoodProvider';
import Meals from '../pages/Meals';
import Categories from '../components/Categories';
import * as api from '../helper/api';

describe('Recipes', () => {
  test('renderiza corretamente os cards de receita', async () => {
    const recipes = [
      {
        idMeal: '1',
        strMeal: 'Meal 1',
        strMealThumb: 'thumb1.jpg',
      },
      {
        idMeal: '2',
        strMeal: 'Meal 2',
        strMealThumb: 'thumb2.jpg',
      },
    ];

    jest.spyOn(api, 'fetchFilterCategories').mockResolvedValue([
      { strCategory: 'Category 1' },
      { strCategory: 'Category 2' },
      { strCategory: 'Category 3' },
      { strCategory: 'Category 4' },
    ]);

    jest.spyOn(api, 'fetchFilterCategories').mockImplementation({
      meals: [
        { idMeal: '1', strMeal: 'Meal 1', strMealThumb: 'thumb1.jpg' },
        { idMeal: '2', strMeal: 'Meal 2', strMealThumb: 'thumb2.jpg' },
      ],
      drinks: [],
    });

    const toggleRenderFiltered = false;

    render(
      <BrowserRouter>
        <FoodProvider value={ { recipes, toggleRenderFiltered } }>
          <Recipes />
          <Meals />
        </FoodProvider>

      </BrowserRouter>,
    );

    screen.debug();

    recipes.forEach((recipe, index) => {
      if (recipe) {
        act(async () => {
          const recipeCardLink = await screen.findByTestId(`${index}-recipe-ca3rd`);
        });
      }
      //   const recipeCardLink = screen.getByTestId(`${index}-recipe-card`);
      //   expect(recipeCardLink).toBeInTheDocument();
      //   expect(recipeCardLink).toHaveAttribute('href', `/meals/${recipe.idMeal}`);

      //   const recipeCardImage = screen.getByTestId(`${index}-card-img`);
      //   expect(recipeCardImage).toBeInTheDocument();
      //   expect(recipeCardImage).toHaveAttribute('src', recipe.strMealThumb);
      //   expect(recipeCardImage).toHaveAttribute('alt', 'Recipe');

    //   const recipeCardName = screen.getByTestId(`${index}-card-name`);
    //   expect(recipeCardName).toBeInTheDocument();
    //   expect(recipeCardName).toHaveTextContent(recipe.strMeal);
    // });
    });

    // test('não renderiza os cards de receita quando toggleRenderFiltered é true', () => {
    //   const recipes = [
    //     {
    //       idMeal: '1',
    //       strMeal: 'Meal 1',
    //       strMealThumb: 'thumb1.jpg',
    //     },
    //     {
    //       idMeal: '2',
    //       strMeal: 'Meal 2',
    //       strMealThumb: 'thumb2.jpg',
    //     },
    //   ];

    //   const toggleRenderFiltered = true;

    //   render(
    //     <BrowserRouter>
    //       <FoodContext.Provider value={ { recipes, toggleRenderFiltered } }>
    //         <Recipes />
    //       </FoodContext.Provider>
    //     </BrowserRouter>,
    //   );

    //   recipes.forEach((recipe, index) => {
    //     const recipeCardLink = screen.queryByTestId(`${index}-recipe-card`);
    //     expect(recipeCardLink).not.toBeInTheDocument();
    //   });
    // });

    // test('não renderiza os cards de receita quando não há receitas', () => {
    //   const recipes = [];
    //   const toggleRenderFiltered = false;

    //   render(
    //     <BrowserRouter>
    //       <FoodContext.Provider value={ { recipes, toggleRenderFiltered } }>
    //         <Recipes />
    //       </FoodContext.Provider>
    //     </BrowserRouter>,
    //   );

  //   const recipeCardLinks = screen.queryAllByTestId(/-recipe-card/i);
  //   expect(recipeCardLinks).toHaveLength(0);
  // });
  });
});
