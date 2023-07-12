// Criando o provider para o contexto de comidas
import React, { useEffect, useMemo, useState } from 'react';

import PropTypes from 'prop-types';
import FoodContext from './FoodContext';

import { fetchCategories, fetchRecipes } from '../helper/api';

function FoodProvider({ children }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);

  // temporário
  useEffect(() => {
    async function fetchRecipesData() {
      let endpoint = '';

      if (window.location.pathname === '/meals') {
        endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      } else if (window.location.pathname === '/drinks') {
        endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      }

      const recipeList = await fetchRecipes(endpoint); // Use a função fetchRecipes do arquivo api.js

      const magicNumber = 12;
      setRecipes(recipeList.slice(0, magicNumber));
    }

    fetchRecipesData();
  }, []);

  useEffect(() => {
    async function fetchCategoriesData() {
      let categoryEndpoint = '';

      if (window.location.pathname === '/meals') {
        categoryEndpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      } else if (window.location.pathname === '/drinks') {
        categoryEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      }

      const categoryList = await fetchCategories(categoryEndpoint); // Use a função fetchCategories do arquivo api.js

      const magicNumber = 5;
      setCategories(categoryList.slice(0, magicNumber));
    }

    fetchCategoriesData();
  }, []);

  const store = useMemo(() => ({
    searchInput,
    setSearchInput,
    searchType,
    setSearchType,
    searchResults,
    setSearchResults,
    recipes,
    setRecipes,
    categories,
    setCategories,

  }), [
    searchInput,
    setSearchInput,
    searchType,
    setSearchType,
    searchResults,
    setSearchResults,
    recipes,
    setRecipes,
    categories,
    setCategories,
  ]);

  return (
    <FoodContext.Provider value={ store }>
      { children }
    </FoodContext.Provider>
  );
}

export default FoodProvider;
FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
