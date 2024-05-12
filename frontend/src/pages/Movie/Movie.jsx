import Subheader from '../../components/Subheader/Subheader';
import styles from './Movie.module.scss';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import MovieTrailerDialog from '../../components/MovieTrailerDialog/MovieTrailerDialog';
import imdbLogo from '../../assets/imdb-logo.png';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieInfo } from '../../api/imdb';
import { addMovieToCollection, removeMovieFromCollection } from '../../api/collection';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { ROUTES } from '../../router/constants';

const Movie = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [movie, setMovie] = useState(null);
  const [openMovieTrailer, setOpenMovieTrailer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieInfo(id).then((response) => {
      setMovie(response);
      document.title = `${response.title} (${response.year})`;
    });

    return () => {
      document.title = 'Movies Library';
    };
  }, []);

  const handleMovieAddition = async () => {
    const data = {
      imdbId: movie.imdbId,
      title: movie.title,
      primaryTitle: movie.primaryTitle,
      year: movie.year,
      genres: movie.genres,
      rating: movie.ratingSummary.rating,
      runtime: movie.runtime,
      image: movie.image,
    };

    try {
      const response = await addMovieToCollection(data);
      user.movies.unshift(response.data);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMovieRemove = async () => {
    try {
      const data = {
        title: movie.title,
        year: movie.year,
      };
      const response = await removeMovieFromCollection(movie.imdbId, data);
      user.movies = user.movies.filter((item) => item.imdbId !== movie.imdbId);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <MovieTrailerDialog show={openMovieTrailer} data={movie} onClose={() => setOpenMovieTrailer(false)} />
      <Subheader>
        {movie && (
          <Box className={styles.subheader}>
            {`${movie.title} (${movie.year})`}
            <Box display={'flex'} alignItems={'center'} gap={2} height={'100%'}>
              <Rating
                sx={{ fontSize: '1.3rem' }}
                defaultValue={movie.ratingSummary.rating}
                max={10}
                precision={0.1}
                readOnly
              />
              <img style={{ height: '100%' }} src={imdbLogo} alt="IMDB Logo" />
              <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                <span>
                  <span style={{ fontWeight: 700 }}>{movie.ratingSummary.rating.toFixed(1)}</span> / 10
                </span>
                <span style={{ fontSize: 12 }}>{movie.ratingSummary.voteCount}</span>
              </Box>
            </Box>
          </Box>
        )}
      </Subheader>
      {movie && (
        <div className={styles.container}>
          <Grid container spacing={3} display={'flex'}>
            <Grid item xs={2.5}>
              <img className="grow" style={{ width: '100%' }} src={movie.image} alt={movie.title} />
            </Grid>
            <Grid item xs={9.5}>
              <Stack spacing={2.5}>
                <Box display={'flex'} gap={2}>
                  {!user.movies.find((item) => item.imdbId === movie.imdbId) ? (
                    <Button
                      onClick={() => handleMovieAddition()}
                      size="small"
                      color="secondary"
                      variant="contained"
                      startIcon={<AddIcon />}
                      sx={{ width: 'fit-content', px: 2 }}
                    >
                      Add To Collection
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleMovieRemove()}
                      size="small"
                      color="error"
                      variant="contained"
                      startIcon={<RemoveIcon />}
                      sx={{ width: 'fit-content', px: 2 }}
                    >
                      Remove From Collection
                    </Button>
                  )}
                  <Button
                    onClick={() => setOpenMovieTrailer(true)}
                    size="small"
                    variant="contained"
                    startIcon={<SmartDisplayIcon />}
                    sx={{ width: 'fit-content', px: 2 }}
                  >
                    Watch trailer
                  </Button>
                </Box>
                <Box display={'flex'} flexDirection={'column'} gap={1}>
                  <Box className={styles.detailKey}>Description</Box>
                  <Box>{movie.description}</Box>
                </Box>
                <Box display={'flex'} flexDirection={'column'} gap={1}>
                  <Box className={styles.detailKey}>Credits</Box>
                  <Box>{movie.credits}</Box>
                </Box>
                <Box display={'flex'} flexDirection={'column'} gap={1}>
                  <Box className={styles.detailKey}>Duration</Box>
                  <Box>{movie.runtime ?? '-'}</Box>
                </Box>
                <Box display={'flex'} flexDirection={'column'} gap={1}>
                  <Box className={styles.detailKey}>Genres</Box>
                  <Box>{movie.genres.join(', ')}</Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Movie;
