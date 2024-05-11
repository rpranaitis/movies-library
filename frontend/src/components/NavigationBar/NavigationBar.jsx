import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import NavTitle from './NavTitle';
import Stack from '@mui/material/Stack';
import NavButton from '../NavButton/NavButton';
import styles from './NavigationBar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES, navigationBarRoutes } from '../../router/constants';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const NavigationBar = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);

  return (
    <nav className={styles.container}>
      <NavTitle>NAVIGATION</NavTitle>
      <Stack className={styles.items} spacing={1.5}>
        {navigationBarRoutes.map((route) => (
          <Link key={route.path} to={route.path} style={{ textDecoration: 'none' }}>
            <NavButton active={location.pathname === route.path} icon={route.icon}>
              {route.name}
              {route.path === ROUTES.HOME && user.movies.length > 0 && (
                <span style={{ fontWeight: 'bold' }}>{user.movies.length}</span>
              )}
            </NavButton>
          </Link>
        ))}
      </Stack>
      <NavTitle>COLLECTION</NavTitle>
    </nav>
  );
};

export default NavigationBar;
