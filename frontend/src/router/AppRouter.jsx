import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Home from '../pages/Home/Home';
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
      Component: isLoggedIn ? Home : Login,
      Layout: isLoggedIn ? AuthLayout : DefaultLayout,
    },
    {
      path: ROUTES.REGISTER,
      Component: Register,
      Layout: DefaultLayout,
    },
  ];

  return (
    <Routes>
      {routes.map(({ path, Layout, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Layout>
              <Component />
            </Layout>
          }
        ></Route>
      ))}
    </Routes>
  );
};

export default AppRouter;
