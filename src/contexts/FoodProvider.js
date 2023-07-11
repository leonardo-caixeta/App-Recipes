// Criando o provider para o contexto de comidas
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './FoodContext';

function FoodProvider({ children }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const store = useMemo(() => ({
    searchInput,
    setSearchInput,
    searchType,
    setSearchType,
    searchResults,
    setSearchResults,
  }), [
    searchInput,
    setSearchInput,
    searchType,
    setSearchType,
    searchResults,
    setSearchResults,
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
