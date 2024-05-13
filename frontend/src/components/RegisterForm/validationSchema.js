import * as Yup from 'yup';

export const registerValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required.'),
  password: Yup.string().required('Password is required.'),
  confirmPassword: Yup.string()
    .required('Password confirmation is required.')
    .test('passwords-match', 'Passwords must match.', function (value) {
      return this.parent.password === value;
    }),
});
