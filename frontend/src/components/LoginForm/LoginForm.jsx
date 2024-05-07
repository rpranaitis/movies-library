import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import styles from './LoginForm.module.scss';
import { loginUser } from '../../api/auth';
import { LuMail, LuKeyRound } from 'react-icons/lu';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { loginInitialValues } from './initialValues';
import { loginValidationSchema } from './validationSchema';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await loginUser(data);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik initialValues={loginInitialValues} onSubmit={handleSubmit} validationSchema={loginValidationSchema}>
      <Form className={styles.form}>
        <InputField name="email" type="email" placeholder="Email">
          <LuMail />
        </InputField>
        <InputField name="password" type="password" placeholder="Password">
          <LuKeyRound />
        </InputField>
        <Button type="submit">SIGN IN</Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
