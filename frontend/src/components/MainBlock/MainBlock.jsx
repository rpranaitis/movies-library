import PropTypes from 'prop-types';
import styles from './MainBlock.module.scss';

const MainBlock = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

MainBlock.propTypes = {};

export default MainBlock;
