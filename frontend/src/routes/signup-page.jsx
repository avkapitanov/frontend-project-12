import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import routes from '../routes';
import axios from 'axios';
import signupImage from '../assets/signup.jpg';
import { useTranslation } from 'react-i18next';

export default function SignupPage() {
  const { t } = useTranslation();

  const auth = useAuth();
  const navigate = useNavigate();
  const usernameInputRef = useRef();
  const [signupError, setSignupFailed] = useState(false);

  const signupSchema = Yup.object().shape({
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

  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={signupImage}
                  className="rounded-circle"
                  alt=""
                />
              </div>
              <h1 className="text-center mb-4">{t('signup.title')}</h1>
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={signupSchema}
                onSubmit={async ({ username, password }, actions) => {
                  setSignupFailed(false);

                  try {
                    const res = await axios.post(
                      routes.api.signUpPath(),
                      { username: username, password: password },
                    );
                    auth.authorize(res.data);
                    navigate(routes.rootPath());
                  } catch (err) {
                    if (!err.isAxiosError) {
                      throw err;
                    }

                    if (err.response.status === 409) {
                      setSignupFailed(true);
                      usernameInputRef.current.select();
                      return;
                    }

                    throw err;
                  }
                }}
              >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="username-field">
                        {t('signup.username')}
                      </label>
                      <Field className="form-control" type="text" id="username-field" name="username" placeholder={t('signup.username')}
                             onChange={handleChange}
                             onBlur={handleBlur}
                             innerRef={usernameInputRef}
                             value={values.username}
                      />

                      {errors.username && touched.username && <ErrorMessage className="text-danger" name="username" component="div" />}
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="password-field">
                        {t('signup.password')}
                      </label>
                      <Field className="form-control" type="password" id="password-field" name="password" placeholder={t('signup.password')}
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.password}
                      />
                      {errors.password && touched.password && <ErrorMessage className="text-danger" name="password" component="div" />}
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="password-confirmation-field">
                        {t('signup.passwordConfirmation')}
                      </label>
                      <Field className="form-control" type="password" id="password-confirmation-field" name="passwordConfirmation" placeholder={t('signup.passwordConfirmation')}
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.passwordConfirmation}
                      />

                      {errors.passwordConfirmation && touched.passwordConfirmation && <ErrorMessage className="text-danger" name="passwordConfirmation" component="div" />}
                    </div>
                      {signupError && <Form.Control.Feedback type="invalid" tooltip>
                        {t('signup.userAlreadyExists')}
                      </Form.Control.Feedback>}
                    <button className="btn btn-outline-primary" type="submit" disabled={isSubmitting}>
                      {t('signup.submit')}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}