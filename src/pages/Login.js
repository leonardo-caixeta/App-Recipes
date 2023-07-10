import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);

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
      <button
        data-testid="login-submit-btn"
        disabled={ isDisable }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
