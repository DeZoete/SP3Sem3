import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import facade from '../util/apiFacade';

export default function Register() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    
  });

  const {setErrorMessage} = useOutletContext();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
 

  const handleChange = (evt) => {
    const { id, value } = evt.target;
    setCredentials({ ...credentials, [id]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setErrorMessage(null);
    facade
      .register(credentials.username, credentials.password)
      .then(() => {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch((err) => {
        setErrorMessage(
          err.fullError?.message || 'An error occurred during registration.'
        );
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
