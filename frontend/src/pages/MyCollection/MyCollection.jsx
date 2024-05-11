import Grid from '@mui/material/Grid';
import Box from '@mui/material//Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SearchInput from '../../components/SearchInput/SearchInput';
import MovieSearchEngine from '../../components/MovieSearchEngine/MovieSearchEngine';
import Subheader from '../../components/Subheader/Subheader';
import styles from './MyCollection.module.scss';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { GenreContext } from '../../contexts/GenreContext';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/constants';

const MyCollection = () => {
  const { user } = useContext(UserContext);
  const { selectedGenre } = useContext(GenreContext);
  const [openMovieSearchEngine, setOpenMovieSearchEngine] = useState(false);
  const [movies, setMovies] = useState(user.movies);
  const [newestSorting, setNewestSorting] = useState(false);
  const [popularitySorting, setPopularitySorting] = useState(false);
  const navigate = useNavigate();

  const filteredItems = selectedGenre ? movies.filter((item) => item.genres.find((x) => x === selectedGenre)) : movies;

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

  return (
    <>
      <MovieSearchEngine show={openMovieSearchEngine} onClose={() => setOpenMovieSearchEngine(false)} />
      <Subheader className={styles.subheader}>
        <Grid container spacing={3} display={'flex'} alignItems={'center'}>
          <Grid item xs={5}>
            <SearchInput onChange={(e) => searchMoviesByTitle(e.target.value)} placeholder="Search Movies" />
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', gap: 1 }}>
            <Button
              onClick={() => sortMoviesByNewest()}
              size="small"
              variant={newestSorting ? 'outlined' : 'text'}
              sx={{ height: 30, px: 3.3 }}
            >
              New Movies
            </Button>
            <Button
              onClick={() => sortMoviesByPopularity()}
              size="small"
              variant={popularitySorting ? 'outlined' : 'text'}
              sx={{ height: 30, px: 3.3 }}
            >
              Popular Movies
            </Button>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
              <Grid key={item.imdbId} item xs={2}>
                <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                  <Box className={styles.imageWrapper}>
                    <img
                      onClick={() => navigateToMovie(item.imdbId)}
                      className={styles.image}
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
