import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import styles from './SearchInput.module.scss';

const SearchInput = ({ searchInput, onChange, ...props }) => {
  return (
    <div className={styles.wrapper} {...props}>
      <SearchIcon style={{ fontSize: 25 }} className={styles.icon} />
      <input onChange={onChange} ref={searchInput} className={styles.input} type="text" />
    </div>
  );
};

SearchInput.propTypes = {
  searchInput: PropTypes.object,
  onChange: PropTypes.func,
};

export default SearchInput;
