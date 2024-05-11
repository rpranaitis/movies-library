import Box from '@mui/material/Box';
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

  const getGenresWithCount = () => {
    const genreCounts = {};

    user.movies.forEach((movie) => {
      movie.genres.forEach((genre) => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });

    const sortedGenres = Object.keys(genreCounts).sort();

    const sortedGenreCounts = {};
    sortedGenres.forEach((genre) => {
      sortedGenreCounts[genre] = genreCounts[genre];
    });

    return sortedGenreCounts;
  };

  return (
    <nav className={styles.container}>
      <NavTitle>NAVIGATION</NavTitle>
      <Stack className={styles.items} spacing={1.5}>
        {navigationBarRoutes.map((route) => (
          <Link key={route.path} to={route.path} style={{ textDecoration: 'none' }}>
            <NavButton active={location.pathname === route.path} icon={route.icon}>
              {route.name}
              {route.path === ROUTES.HOME && user.movies.length > 0 && (
                <span style={{ fontWeight: 600 }}>{user.movies.length}</span>
              )}
            </NavButton>
          </Link>
        ))}
      </Stack>
      <NavTitle>COLLECTION</NavTitle>
      <Box
        className={styles.items}
        color={'white'}
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        gap={0.2}
        maxWidth="400px"
        fontSize={12}
      >
        {Object.entries(getGenresWithCount()).map(([genre, count], index) => (
          <div
            key={index}
            style={{ marginBottom: '5px', width: 'calc(50% - 5px)', display: 'flex', alignItems: 'center' }}
          >
            <div className={styles.genreCircle}>{count}</div>
            {genre}
          </div>
        ))}
      </Box>
    </nav>
  );
};

export default NavigationBar;
