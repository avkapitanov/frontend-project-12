import * as Yup from 'yup';

const signupSchema = (t) => Yup.object().shape({
  username: Yup.string()
    .min(3, t('signup.usernameLength'))
    .max(20, t('signup.usernameLength'))
    .required(t('signup.requiredField')),
  password: Yup.string()
    .min(6, t('signup.passMinLength'))
    .required(t('signup.requiredField')),
  passwordConfirmation: Yup.string()
    .required(t('signup.requiredField'))
    .oneOf([Yup.ref('password'), null], t('signup.passNotMatch')),
});

export default signupSchema;
