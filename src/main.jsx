import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
/*
import MainLayout from './layouts/MainLayout.jsx';
import Login from './pages/Login.jsx';
import ZooPage from './pages/ZooPage.jsx';
*/
import Home from './pages/Home.jsx';

/*
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="todos" element={<ZooPage />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
    {/*<RouterProvider router={router} /> */}
  </StrictMode>
);
