import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import Error from '../Error/Error';
import styles from './LoginForm.module.scss';
import { loginUser } from '../../api/auth';
import { LuUser2, LuKeyRound } from 'react-icons/lu';
import { Formik, Form, ErrorMessage } from 'formik';
import { loginInitialValues } from './initialValues';
import { loginValidationSchema } from './validationSchema';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const LoginForm = () => {
  const { handleLogin } = useContext(UserContext);

  const handleSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      handleLogin(response.user, response.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik initialValues={loginInitialValues} onSubmit={handleSubmit} validationSchema={loginValidationSchema}>
      <Form className={styles.form}>
        <InputField name="username" type="text" placeholder="Username">
          <LuUser2 style={{ fontSize: 16 }} />
        </InputField>
        <ErrorMessage name="username" component={Error} />
        <InputField name="password" type="password" placeholder="Password">
          <LuKeyRound style={{ fontSize: 16 }} />
        </InputField>
        <ErrorMessage name="password" component={Error} />
        <Button type="submit">SIGN IN</Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
