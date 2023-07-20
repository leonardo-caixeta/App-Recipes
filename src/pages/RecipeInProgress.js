export default function RecipeInProgress() {
  return (
    <div>
      <img data-testid="recipe-photo" src="" alt="" />
      <h2 data-testid="recipe-title">title</h2>
      <button data-testid="share-btn">share</button>
      <button data-testid="favorite-btn">favorite</button>
      <p data-testid="recipe-category">category</p>
      <p data-testid="instructions">instructions</p>
      <button data-testid="finish-recipe-btn">finish</button>
    </div>
  );
}
