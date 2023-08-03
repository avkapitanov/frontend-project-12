import * as Yup from 'yup';

const loginSchema = (t) => Yup.object().shape({
  username: Yup.string().required(t('errors.requiredField')),
  password: Yup.string().required(t('errors.requiredField')),
});

export default loginSchema;