import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FoodContext from '../contexts/FoodContext';

export default function Profile() {
  const { setRecipeType } = useContext(FoodContext);
  useEffect(() => {
    setRecipeType('profile');
  }, []);

  const loginEmail = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
  };

  return (
    <section className="page-container">
      <Header haveSearch={ false } title="Profile" />
      <main>
        <p data-testid="profile-email">{loginEmail && loginEmail.email}</p>
        <section>
          <Link to="./done-recipes" data-testid="profile-done-btn">Done Recipes</Link>
          <Link
            to="./favorite-recipes"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </Link>
        </section>
        <Link
          to="/"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </Link>
      </main>
      <Footer />
    </section>
  );
}
