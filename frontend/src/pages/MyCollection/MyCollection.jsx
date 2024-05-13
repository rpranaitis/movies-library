import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SearchInput from '../../components/SearchInput/SearchInput';
import MovieSearchEngine from '../../components/MovieSearchEngine/MovieSearchEngine';
import Subheader from '../../components/Subheader/Subheader';
import styles from './MyCollection.module.scss';
import StarIcon from '@mui/icons-material/Star';
import classNames from 'classnames';
import { useMediaQuery } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { GenreContext } from '../../contexts/GenreContext';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/constants';

const MyCollection = () => {
  const { user } = useContext(UserContext);
  const { selectedGenre, selectGenre } = useContext(GenreContext);
  const [openMovieSearchEngine, setOpenMovieSearchEngine] = useState(false);
  const [movies, setMovies] = useState(user.movies);
  const [newestSorting, setNewestSorting] = useState(false);
  const [popularitySorting, setPopularitySorting] = useState(false);
  const navigate = useNavigate();

  const filteredItems = selectedGenre ? movies.filter((item) => item.genres.find((x) => x === selectedGenre)) : movies;

  useEffect(() => {
    selectGenre(null);
  }, []);

  const navigateToMovie = (id) => {
    navigate(generatePath(ROUTES.MOVIE, { id }));
  };

  const sortMoviesByNewest = () => {
    if (newestSorting) {
      setMovies(user.movies);
      setNewestSorting(false);

      return;
    }

    const sortedMovies = [...movies].sort((a, b) => b.year - a.year);
    setMovies(sortedMovies);
    setPopularitySorting(false);
    setNewestSorting(true);
  };

  const sortMoviesByPopularity = () => {
    if (popularitySorting) {
      setMovies(user.movies);
      setPopularitySorting(false);

      return;
    }

    const sortedMovies = [...movies].sort((a, b) => b.rating - a.rating);
    setMovies(sortedMovies);
    setPopularitySorting(true);
    setNewestSorting(false);
  };

  const normalizeString = (str) => {
    const accentMap = {
      ą: 'a',
      č: 'c',
      ę: 'e',
      ė: 'e',
      į: 'i',
      š: 's',
      ų: 'u',
      ū: 'u',
      ž: 'z',
      Ą: 'A',
      Č: 'C',
      Ę: 'E',
      Ė: 'E',
      Į: 'I',
      Š: 'S',
      Ų: 'U',
      Ū: 'U',
      Ž: 'Z',
    };

    return str.replace(/[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/g, (match) => accentMap[match]);
  };

  const searchMoviesByTitle = (query) => {
    setNewestSorting(false);
    setPopularitySorting(false);

    const normalizedQuery = normalizeString(query).toLowerCase();

    const filteredResults = user.movies.filter((movie) => {
      const normalizedTitle = normalizeString(movie.title).toLowerCase();
      const normalizedPrimaryTitle = normalizeString(movie.primaryTitle).toLowerCase();

      return normalizedTitle.includes(normalizedQuery) || normalizedPrimaryTitle.includes(normalizedQuery);
    });

    setMovies(filteredResults);
  };

  const isVerySmallScreen = useMediaQuery('(max-width:405px)');
  const isSmallScreen = useMediaQuery('(max-width:991px)');
  const isBigScreen = useMediaQuery('(min-width:1350px)');

  return (
    <>
      <MovieSearchEngine show={openMovieSearchEngine} onClose={() => setOpenMovieSearchEngine(false)} />
      <Subheader className={styles.subheader}>
        <Grid container spacing={3} display={'flex'} alignItems={'center'}>
          <Grid item xs={12} lg={4} xl={5}>
            <SearchInput onChange={(e) => searchMoviesByTitle(e.target.value)} placeholder="Search Movies" />
          </Grid>
          <Grid className={styles.filterButtonsWrapper} item xs={12} lg={4} xl={4}>
            <Button
              onClick={() => sortMoviesByNewest()}
              className={styles.newMoviesFilterButton}
              size="small"
              variant={newestSorting ? 'outlined' : 'text'}
              sx={{ height: 30, px: 3.3 }}
            >
              {(!isVerySmallScreen && isSmallScreen) || isBigScreen ? 'New Movies' : 'New'}
            </Button>
            <Button
              onClick={() => sortMoviesByPopularity()}
              size="small"
              variant={popularitySorting ? 'outlined' : 'text'}
              sx={{ height: 30, px: 3.3 }}
            >
              {(!isVerySmallScreen && isSmallScreen) || isBigScreen ? 'Popular Movies' : 'Popular'}
            </Button>
          </Grid>
          <Grid className={styles.addButtonWrapper} item xs={12} lg={4} xl={3}>
            <Button
              onClick={() => setOpenMovieSearchEngine(true)}
              size="small"
              color="secondary"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ marginRight: 1, px: 3.3 }}
            >
              Add the movie
            </Button>
          </Grid>
        </Grid>
      </Subheader>
      <div className={styles.container}>
        {filteredItems.length > 0 ? (
          <Grid container spacing={3}>
            {filteredItems.map((item) => (
              <Grid key={item.imdbId} item xs={6} sm={4} lg={3} xl={2}>
                <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                  <Box className={styles.imageWrapper}>
                    <img
                      onClick={() => navigateToMovie(item.imdbId)}
                      className={classNames(styles.image, 'grow')}
                      src={item.image}
                      alt={item.title}
                      style={{ cursor: 'pointer' }}
                    />
                    <Box className={styles.rating}>
                      <StarIcon className={styles.ratingIcon} />
                      <span>{item.rating.toFixed(1)}</span>
                    </Box>
                  </Box>
                  <Box display={'flex'} flexDirection={'column'} gap={0.65} sx={{ overflowWrap: 'anywhere' }}>
                    <span>
                      {item.title} ({item.year})
                    </span>
                    <span className={styles.genre}>{item.genres.join(' / ')}</span>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <span>No results</span>
        )}
      </div>
    </>
  );
};

export default MyCollection;
