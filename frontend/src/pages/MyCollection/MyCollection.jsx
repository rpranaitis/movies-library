import Grid from '@mui/material/Grid';
import Box from '@mui/material//Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SearchInput from '../../components/SearchInput/SearchInput';
import MovieSearchEngine from '../../components/MovieSearchEngine/MovieSearchEngine';
import Subheader from '../../components/Subheader/Subheader';
import styles from './MyCollection.module.scss';
import { useState } from 'react';

const MyCollection = () => {
  const [openMovieSearchEngine, setOpenMovieSearchEngine] = useState(false);

  return (
    <>
      <MovieSearchEngine show={openMovieSearchEngine} onClose={() => setOpenMovieSearchEngine(false)} />
      <Subheader className={styles.subheader}>
        <Grid container spacing={3} display={'flex'} alignItems={'center'}>
          <Grid item xs={5}>
            <SearchInput placeholder={'Search Movies'} />
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', gap: 1 }}>
            <Button size="small" variant="text" sx={{ height: 30, px: 3.3 }}>
              New Movies
            </Button>
            <Button size="small" variant="text" sx={{ height: 30, px: 3.3 }}>
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
              sx={{ height: 30, marginRight: 2, px: 3.3 }}
            >
              Add the movie
            </Button>
          </Grid>
        </Grid>
      </Subheader>
      <div className={styles.container}>
        <Box display={'flex'}>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5} sx={{ overflowWrap: 'anywhere' }}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                <img
                  className={styles.image}
                  src="https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
                  alt="Movie title"
                />
                <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                  <span>The Revenant</span>
                  <span className={styles.genre}>Drama</span>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default MyCollection;
