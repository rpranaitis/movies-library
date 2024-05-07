import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Home from '../pages/Home/Home';
import AuthLayout from '../layouts/AuthLayout';
import DefaultLayout from '../layouts/DefaultLayout';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
};

export const routes = [
  {
    path: ROUTES.HOME,
    Component: Home,
    Layout: AuthLayout,
  },
  {
    path: ROUTES.LOGIN,
    Component: Login,
    Layout: DefaultLayout,
  },
  {
    path: ROUTES.REGISTER,
    Component: Register,
    Layout: DefaultLayout,
  },
];

export const navigationBarRoutes = [
  {
    name: 'Home',
    path: ROUTES.HOME,
  },
  {
    name: 'Home',
    path: ROUTES.HOME,
  },
];
