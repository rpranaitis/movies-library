import styles from './Login.module.scss';
import LoginForm from '../../components/LoginForm/LoginForm';
import BasicView from '../../components/BasicView/BasicView';
import { ROUTES } from '../../routes';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <BasicView>
      <h3 className={styles.title}>WELCOME TO MOVIES LIBRARY</h3>
      <LoginForm />
      <Link to={ROUTES.REGISTER} className={styles.linkText}>
        Not a member?
      </Link>
    </BasicView>
  );
};

export default Login;
