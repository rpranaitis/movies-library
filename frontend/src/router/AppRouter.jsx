import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import MyCollection from '../pages/MyCollection/MyCollection';
import Users from '../pages/Users/Users';
import Movie from '../pages/Movie/Movie';
import Secured from '../pages/Secured/Secured';
import AuthLayout from '../layouts/AuthLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { ROUTES } from './constants';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  const { isLoggedIn } = useContext(UserContext);

  const routes = [
    {
      path: ROUTES.HOME,
      Component: isLoggedIn ? MyCollection : Login,
      Layout: isLoggedIn ? AuthLayout : DefaultLayout,
      secured: false,
    },
    {
      path: ROUTES.REGISTER,
      Component: Register,
      Layout: DefaultLayout,
      secured: false,
    },
    {
      path: ROUTES.USERS,
      Component: Users,
      Layout: AuthLayout,
      secured: true,
    },
    {
      path: ROUTES.MOVIE,
      Component: Movie,
      Layout: AuthLayout,
      secured: true,
    },
  ];

  return (
    <Routes>
      {routes.map(({ path, Layout, Component, secured }) => (
        <Route
          key={path}
          path={path}
          element={
            secured && !isLoggedIn ? (
              <Secured />
            ) : (
              <Layout>
                <Component />
              </Layout>
            )
          }
        ></Route>
      ))}
    </Routes>
  );
};

export default AppRouter;
