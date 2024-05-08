import PropTypes from 'prop-types';
import styles from './NavTitle.module.scss';

const NavTitle = ({ children }) => {
  return <div className={styles.navTitle}>{children}</div>;
};

NavTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default NavTitle;
