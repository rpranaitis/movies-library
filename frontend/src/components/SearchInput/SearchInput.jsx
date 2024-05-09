import SearchIcon from '@mui/icons-material/Search';
import styles from './SearchInput.module.scss';

const SearchInput = ({ ...props }) => {
  return (
    <div className={styles.wrapper} {...props}>
      <SearchIcon style={{ fontSize: 25 }} className={styles.icon} />
      <input className={styles.input} type="text" />
    </div>
  );
};

export default SearchInput;
