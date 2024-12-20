
const BASE_URL = 'https://codupont.dk/api/v1/';
const LOGIN_URL = 'https://sp3api.magnewei.com/api/';
const BASE_URL2 = 'https://codupont.dk/api/v1/';

const LOGIN_ENDPOINT = 'auth/login';
const REGISTER_ENDPOINT = 'auth/register';
const ALL_ZOOS_ENDPOINT = 'zoo';

function handleHttpErrors(res) {
  if (!res.ok) {
    return res.json().then((err) => {
      throw { status: res.status, fullError: err };
    });
  }
  return res.json();
}

function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem('jwtToken', token);
  };

  const getToken = () => {
    return localStorage.getItem('jwtToken');
  };

  const loggedIn = () => {
    return getToken() != null;
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
  };

  const getUserRoles = () => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = getToken().split('.')[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      const roles = decodedClaims.roles;
      return roles;
    } else return '';
  };

  const hasUserAccess = (neededRole, loggedIn) => {
    const roles = getUserRoles().split(',');
    return loggedIn && roles.includes(neededRole);
  };

  const login = (user, password) => {
    const options = makeOptions('POST', true, {
      username: user,
      password: password,
    });
    return fetch(LOGIN_URL + LOGIN_ENDPOINT, options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      })
      .catch((err) => {
        console.error('Login error:', err);
        throw err;
      });
  };

  const register = (user, password) => {
    const options = makeOptions('POST', false, {
      username: user,
      password: password,
    });
    return fetch(LOGIN_URL + REGISTER_ENDPOINT, options)
      .then(handleHttpErrors)
      .catch((err) => {
        console.error('Registration error:', err);
        throw err;
      });
  };

  const fetchData = () => {
    const options = makeOptions('GET', true); // True adds the token
    return fetch(BASE_URL + ALL_ZOOS_ENDPOINT, options).then(
      handleHttpErrors
    );
  };
  const fetchDataZoo = (endpoint) => {
    const options = makeOptions('GET', true); // True adds the token
    return fetch(BASE_URL2 + endpoint, options).then(
      handleHttpErrors
    );
  };

  const getData = (endpoint) => {
    const options = makeOptions('GET', true);
    return fetch(BASE_URL + endpoint, options).then(handleHttpErrors);
  };

  const postData = (endpoint, data) => {
    const options = makeOptions('POST', true, data);
    return fetch(BASE_URL + endpoint, options).then(handleHttpErrors);
  };

  const putData = (endpoint, data) => {
    const options = makeOptions('PUT', true, data);
    return fetch(BASE_URL + endpoint, options).then(handleHttpErrors);
  };

  const deleteData = (endpoint) => {
    const options = makeOptions('DELETE', true);
    return fetch(BASE_URL + endpoint, options).then(handleHttpErrors);
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    };
    if (addToken && loggedIn()) {
      opts.headers['Authorization'] = `Bearer ${getToken()}`;
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    register,
    hasUserAccess,
    getData,
    postData,
    putData,
    deleteData,

    fetchDataZoo,

  };
}

const facade = apiFacade();
export default facade;
