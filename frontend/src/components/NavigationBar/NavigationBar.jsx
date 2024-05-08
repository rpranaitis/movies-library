import NavTitle from './NavTitle';
import Stack from '@mui/material/Stack';
import NavButton from '../NavButton/NavButton';
import styles from './NavigationBar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { navigationBarRoutes } from '../../router/constants';

const NavigationBar = () => {
  const location = useLocation();

  return (
    <nav className={styles.container}>
      <NavTitle>NAVIGATION</NavTitle>
      <Stack className={styles.items} spacing={1.5}>
        {navigationBarRoutes.map((route) => (
          <Link key={route.path} to={route.path} style={{ textDecoration: 'none' }}>
            <NavButton active={location.pathname === route.path} icon={route.icon}>
              {route.name}
            </NavButton>
          </Link>
        ))}
      </Stack>
      <NavTitle>COLLECTION</NavTitle>
    </nav>
  );
};

export default NavigationBar;
