import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import Error from '../Error/Error';
import styles from './RegisterForm.module.scss';
import { Formik, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/constants';
import { registerInitialValues } from './initialValues';
import { registerValidationSchema } from './validationSchema';
import { registerUser } from '../../api/auth';

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik initialValues={registerInitialValues} onSubmit={handleSubmit} validationSchema={registerValidationSchema}>
      <Form className={styles.form}>
        <InputField name="email" type="email" placeholder="Email" />
        <ErrorMessage name="email" component={Error} />
        <InputField name="password" type="password" placeholder="Password" />
        <ErrorMessage name="password" component={Error} />
        <InputField name="confirmPassword" type="password" placeholder="Confirm Password" />
        <ErrorMessage name="confirmPassword" component={Error} />
        <Button type="submit">REGISTER</Button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
