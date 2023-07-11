import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';

export default function Profile() {
  const loginEmail = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
  };

  return (
    <>
      <Header haveSearch={ false } title="Profile" />
      <main>
        <img alt="Imagem do perfil" src={ profileIcon } />
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
    </>
  );
}
