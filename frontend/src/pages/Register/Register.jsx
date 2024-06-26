import styles from './Register.module.scss';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import BasicView from '../../components/BasicView/BasicView';
import { ROUTES } from '../../router/constants';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <BasicView>
      <h3 className={styles.title}>REGISTRATION FORM</h3>
      <RegisterForm />
      <Link to={ROUTES.HOME} className={styles.linkText}>
        Go back
      </Link>
    </BasicView>
  );
};

export default Login;
