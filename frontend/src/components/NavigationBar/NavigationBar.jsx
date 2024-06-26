import Box from '@mui/material/Box';
import NavTitle from './NavTitle';
import Stack from '@mui/material/Stack';
import NavButton from '../NavButton/NavButton';
import styles from './NavigationBar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES, navigationBarRoutes } from '../../router/constants';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { GenreContext } from '../../contexts/GenreContext';

const NavigationBar = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { selectedGenres, selectGenre } = useContext(GenreContext);

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
      {location.pathname === ROUTES.HOME && user.movies.length > 0 && (
        <Box>
          <NavTitle>COLLECTION</NavTitle>
          <Box className={styles.items} gap={0.2}>
            {Object.entries(getGenresWithCount()).map(([genre, count], index) => (
              <div key={index} className={styles.genreItem}>
                <div
                  onClick={() => selectGenre(selectedGenres.includes(genre) ? null : genre)}
                  className={`${styles.genreCircle} ${
                    selectedGenres.includes(genre) ? styles.selectedGenreCircle : ''
                  }`}
                >
                  {count}
                </div>
                <span
                  onClick={() => selectGenre(selectedGenres.includes(genre) ? null : genre)}
                  className={styles.genreText}
                >
                  {genre}
                </span>
              </div>
            ))}
          </Box>
        </Box>
      )}
    </nav>
  );
};

export default NavigationBar;
