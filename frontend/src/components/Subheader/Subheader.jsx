import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SearchInput from '../SearchInput/SearchInput';
import Grid from '@mui/material/Grid';
import styles from './Subheader.module.scss';

const Subheader = () => {
  return (
    <div className={styles.container}>
      <Grid container spacing={3} display={'flex'} alignItems={'center'}>
        <Grid item xs={8}>
          <SearchInput placeholder={'Search Movies'} />
        </Grid>
        <Grid item xs={2}>
          Showing 10 items
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
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
    </div>
  );
};

export default Subheader;
