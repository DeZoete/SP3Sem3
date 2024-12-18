import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,Navigate
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import About from "./pages/About.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ZooPage from "./pages/ZooPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { useState } from "react";


export default function Router() {
  const [loggedIn, setLoggedIn] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route
          path="login"
          element={
            loggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Login setLoggedIn={setLoggedIn} />
            )
          }
        />
        <Route path="register" element={<Register />} />
        <Route
          path="zoo"
          element={
            loggedIn ? (
              <ZooPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
