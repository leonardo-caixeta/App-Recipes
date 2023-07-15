import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from '../images/logoRecipesApp.png';
import tomate from '../images/tomate.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  useMemo(() => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordLength = 6;
    if (emailRegex.test(email) && password.length > passwordLength) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [email, password]);

  const setUserInLocalStorage = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <section className="login-container">
      <header>
        <img src={ logo } alt="App de Receitas" className="login-logo" />
        <img
          src={ tomate }
          alt="Salada com tomates cortados e alface"
          className="login-banner"
        />
      </header>
      <main className="login-main-container">
        <h1>Login</h1>
        <input
          type="text"
          id="email-input"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
          value={ email }
          placeholder="Email"
        />
        <input
          type="text"
          id="password-input"
          data-testid="password-input"
          onChange={ ({ target }) => setPassword(target.value) }
          value={ password }
          placeholder="Password"
        />
        <Link to="/meals">
          <button
            data-testid="login-submit-btn"
            disabled={ isDisable }
            onClick={ setUserInLocalStorage }
            className="defaultBtn"
          >
            Enter
          </button>
        </Link>
      </main>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Login;
