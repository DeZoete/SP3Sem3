import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import About from './pages/About.jsx';
import AdminPage from './pages/AdminPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ZooPage from './pages/ZooPage.jsx';
const App = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<MainLayout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      >
        <Route index element={<Home />} />
        <Route path="zoopage" element={<ZooPage />} />
        <Route path="register" element={<Register />} />
        <Route path="adminpage" element={<AdminPage />} />
        <Route path="login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="error" element={<ErrorPage />} />
        <Route path="about" element={<About />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
