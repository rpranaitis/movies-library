import Grid from '@mui/material/Grid';
import Box from '@mui/material//Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SearchInput from '../../components/SearchInput/SearchInput';
import MovieSearchEngine from '../../components/MovieSearchEngine/MovieSearchEngine';
import Subheader from '../../components/Subheader/Subheader';
import styles from './MyCollection.module.scss';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const MyCollection = () => {
  const { user } = useContext(UserContext);
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
              sx={{ marginRight: 1, px: 3.3 }}
            >
              Add the movie
            </Button>
          </Grid>
        </Grid>
      </Subheader>
      <div className={styles.container}>
        <Box display={'flex'}>
          <Grid container spacing={3}>
            {user.movies.map((item) => (
              <Grid item xs={2}>
                <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                  <img className={styles.image} src={item.image} alt={item.title} />
                  <Box display={'flex'} flexDirection={'column'} gap={0.5} sx={{ overflowWrap: 'anywhere' }}>
                    <span>
                      {item.title} ({item.year})
                    </span>
                    <span className={styles.genre}>{item.genres[0]}</span>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default MyCollection;
