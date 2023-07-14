export default function RecipeDetails() {
  const id = window.location.pathname.replace(/^\/[^/]+\//, '');
  const path = window.location.pathname.split('/')[1];
  console.log(path, id);
  return (
    <div>
      details
    </div>
  );
}
