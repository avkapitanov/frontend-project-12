import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import routes from '../routes';
import signupImage from '../assets/signup.jpg';
import signupSchema from '../validation/signupSchema';
import useAuth from '../hooks/useAuth';

const SignupPage = () => {
  const { t } = useTranslation();

  const auth = useAuth();
  const token = auth.getToken();
  const navigate = useNavigate();
  const usernameInputRef = useRef();
  const [signupError, setSignupFailed] = useState(false);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={signupImage} className="rounded-circle" alt="" />
              </div>
              <Formik
                initialValues={{ username: '', password: '', passwordConfirmation: '' }}
                validationSchema={signupSchema(t)}
                onSubmit={async ({ username, password }) => {
                  setSignupFailed(false);
                  try {
                    const res = await axios.post(
                      routes.api.signUpPath(),
                      { username, password },
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
                  values, errors, touched, handleSubmit, isSubmitting,
                }) => (
                  <Form className="w-50" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">{t('signup.title')}</h1>
                    <div className="form-floating mb-3">
                      <Field
                        className={cn('form-control', { 'is-invalid': signupError || (errors.username && touched.username) })}
                        type="text"
                        id="username-field"
                        name="username"
                        placeholder={t('signup.username')}
                        innerRef={usernameInputRef}
                        value={values.username}
                      />
                      <label className="form-label" htmlFor="username-field">{t('signup.username')}</label>
                      <div className="invalid-tooltip">{errors.username}</div>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        className={cn('form-control', { 'is-invalid': signupError || (errors.password && touched.password) })}
                        type="password"
                        id="password-field"
                        name="password"
                        placeholder={t('signup.password')}
                        value={values.password}
                      />
                      <label htmlFor="password-field">{t('signup.password')}</label>
                      <div className="invalid-tooltip">{errors.password}</div>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        className={cn('form-control', { 'is-invalid': signupError || (errors.passwordConfirmation && touched.passwordConfirmation) })}
                        type="password"
                        id="password-confirmation-field"
                        name="passwordConfirmation"
                        placeholder={t('signup.passwordConfirmation')}
                        value={values.passwordConfirmation}
                      />
                      <label htmlFor="password-confirmation-field">{t('signup.passwordConfirmation')}</label>
                      <div className="invalid-tooltip">
                        {signupError ? t('signup.userAlreadyExists') : null}
                        {errors.passwordConfirmation}
                      </div>
                    </div>
                    <button className="w-100 mb-3 btn btn-outline-primary" type="submit" disabled={isSubmitting}>
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
};

export default SignupPage;
