import PropTypes from 'prop-types';
import styles from './Users.module.scss';
import Subheader from '../../components/Subheader/Subheader';

const Users = () => {
  return (
    <>
      <Subheader></Subheader>
      <div className={styles.container}>Users</div>
    </>
  );
};

Users.propTypes = {};

export default Users;
