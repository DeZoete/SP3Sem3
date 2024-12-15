import React, { useContext, useState } from 'react';
import { ErrorContext } from '../context/ErrorContext';
import facade from '../util/apiFacade';

function LogIn({ setLoggedIn }) {
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const { setErrorMessage } = useContext(ErrorContext);

  const performLogin = (evt) => {
    evt.preventDefault();
    facade
      .login(loginCredentials.username, loginCredentials.password)
      .then(() => setLoggedIn(true))
      .catch((err) => {
        console.log(err);
        if (err.fullError) {
          setErrorMessage(
            'Login failed: ' + (err.fullError.message || 'Unknown error')
          );
        } else {
          setErrorMessage('Login failed: ' + (err.message || 'Unknown error'));
        }
      });
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={performLogin}>
        <input
          placeholder="User Name"
          id="username"
          onChange={onChange}
          value={loginCredentials.username}
        />
        <input
          placeholder="Password"
          id="password"
          type="password"
          onChange={onChange}
          value={loginCredentials.password}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LogIn;
