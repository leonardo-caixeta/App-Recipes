import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    <div>
      <label htmlFor="email-input">
        Insira o email
        <input
          type="text"
          id="email-input"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
          value={ email }
        />
      </label>
      <label htmlFor="password-input">
        Insira a senha
        <input
          type="text"
          id="password-input"
          data-testid="password-input"
          onChange={ ({ target }) => setPassword(target.value) }
          value={ password }
        />
      </label>
      <Link to="/meals">
        <button
          data-testid="login-submit-btn"
          disabled={ isDisable }
          onClick={ setUserInLocalStorage }
        >
          Enter
        </button>
      </Link>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Login;
