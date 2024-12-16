import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import facade from '../util/apiFacade';

function LogIn({ setLoggedIn }) {
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const { setErrorMessage } = useOutletContext();
  


  const performLogin = (event) => {
    event.preventDefault();
    facade
      .login(loginCredentials.username, loginCredentials.password)
      .then(() => setLoggedIn(true))
      .catch((err) => {
        console.log(err);
        if (err.fullError) {
          setErrorMessage(
            'Login failed: ' + (err.fullError.message || 'password or username is incorrect')
          );
        } else {
          setErrorMessage('Login failed: ' + (err.message || 'password or username is incorrect'));
        }
      });
  };

  const onChange = (event) => {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={performLogin}>
        <input
          placeholder="Username"
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
