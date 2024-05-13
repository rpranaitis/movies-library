import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Email format is not correct.').required('Email is required.'),
  password: Yup.string().required('Password is required.'),
});
