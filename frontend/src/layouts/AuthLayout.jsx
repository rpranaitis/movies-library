import PropTypes from 'prop-types';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import styles from './AuthLayout.module.scss';

const AuthLayout = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <div className={styles.container}>{children}</div>
    </>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
