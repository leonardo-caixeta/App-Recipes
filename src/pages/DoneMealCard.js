import React from 'react';

function DoneMealCard() {
  const index = 0;
  const tagName = '';
  return (
    <section>
      <img alt="" src="" data-testid={ `${index}-horizontal-image` } />
      <div>
        <h2 data-testid={ `${index}-horizontal-name` }>Name</h2>
        <p data-testid={ `${index}-horizontal-top-text` }>Categoria</p>
        <p data-testid={ `${index}-horizontal-done-date` }>Data</p>
        <button data-testid={ `${index}-horizontal-share-btn` }>Compartilhar</button>
        <span data-testid={ `${index}-${tagName}-horizontal-tag` }>tag</span>
      </div>
    </section>
  );
}

export default DoneMealCard;
