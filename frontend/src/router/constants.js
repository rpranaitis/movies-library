import { BsCollectionPlayFill, BsPeopleFill } from 'react-icons/bs';

export const ROUTES = {
  HOME: '/',
  REGISTER: '/register',
  USERS: '/users',
};

export const navigationBarRoutes = [
  {
    name: 'My Collection',
    path: ROUTES.HOME,
    icon: BsCollectionPlayFill,
  },
  {
    name: 'Users',
    path: ROUTES.USERS,
    icon: BsPeopleFill,
  },
];
