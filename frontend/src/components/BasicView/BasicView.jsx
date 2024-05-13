import styles from './BasicView.module.scss';
import popcorn from '../../assets/popcorn.png';
import PropTypes from 'prop-types';

const BasicView = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img className={styles.popcorn} src={popcorn} alt="Popcorn movie" />
        {children}
      </div>
    </div>
  );
};

BasicView.propTypes = {
  children: PropTypes.node,
};

export default BasicView;
