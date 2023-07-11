import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';

export default function Profile() {
  const loginEmail = localStorage.getItem('user');
  console.log(loginEmail);
  return (
    <>
      <Header haveSearch={ false } title="Profile" />
      <main>
        <img alt="Imagem do perfil" src={ profileIcon } />
        <p data-testid="profile-email">{loginEmail}</p>
        <section>
          <Link to="./done-recipes" data-testid="profile-done-btn">Done Recipes</Link>
          <Link
            to="./favorite-recipes"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </Link>
        </section>
        <button data-testid="profile-logout-btn">Logout</button>
      </main>
      <Footer />
    </>
  );
}
