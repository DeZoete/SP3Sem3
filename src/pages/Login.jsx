import React, { useState } from 'react';
import facade from '../util/apiFacade';

function LogIn({ setLoggedIn }) {
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [error, setError] = useState(null);

  const performLogin = (evt) => {
    evt.preventDefault();
    facade.login(loginCredentials.username, loginCredentials.password)
      .then(() => setLoggedIn(true))
      .catch(err => {
        console.log(err);
        if (err.fullError) {
          setError("Login failed: " + (err.fullError.message || "Unknown error"));
        } else {
          setError("Login failed: " + (err.message || "Unknown error"));
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default LogIn;