import { Link, useLocation } from 'react-router-dom';
import { ROUTES, navigationBarRoutes } from '../../router/constants';
import { LuLogOut } from 'react-icons/lu';
import styles from './NavigationBar.module.scss';

const NavigationBar = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {navigationBarRoutes.map((route) => (
          <Link key={route.path} to={route.path} className={location.pathname === route.path ? styles.active : ''}>
            {route.name}
          </Link>
        ))}
      </nav>
      <div className={styles.logoutWrapper}>
        <Link to={ROUTES.HOME}>
          <LuLogOut />
        </Link>
      </div>
    </header>
  );
};

export default NavigationBar;
