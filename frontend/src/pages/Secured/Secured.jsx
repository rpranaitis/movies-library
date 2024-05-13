import styles from './Secured.module.scss';
import ErrorIcon from '@mui/icons-material/Error';

const Secured = () => {
  return (
    <div className={styles.container}>
      <ErrorIcon sx={{ marginRight: 0.5 }} />
      This route is protected. Please log in to see it.
    </div>
  );
};

export default Secured;
