import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import loginImage from '../assets/login.jpg';
import loginSchema from '../validation/loginSchema';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const { t } = useTranslation();

  const auth = useAuth();
  const token = auth.getToken();
  const navigate = useNavigate();
  const usernameInputRef = useRef();
  const [authError, setAuthError] = useState('');

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
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginImage} className="rounded-circle" alt="" />
              </div>
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={loginSchema(t)}
                onSubmit={async (values) => {
                  setAuthError(false);
                  try {
                    await auth.logIn(values);
                    navigate('/');
                  } catch ({ response }) {
                    const errMsg = (response.status === 401)
                      ? t('login.authError') : t('login.networkError');
                    setAuthError(errMsg);
                    usernameInputRef.current.focus();
                  }
                }}
              >
                {({ values, handleSubmit, isSubmitting }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">{t('login.title')}</h1>
                    <div className="form-floating mb-3">
                      <Field
                        className={cn('form-control', { 'is-invalid': authError })}
                        type="text"
                        id="username-field"
                        name="username"
                        required
                        placeholder={t('login.username')}
                        innerRef={usernameInputRef}
                        value={values.username}
                      />
                      <label htmlFor="username-field">{t('login.username')}</label>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        className={cn('form-control', { 'is-invalid': authError })}
                        type="password"
                        id="password-field"
                        name="password"
                        required
                        placeholder={t('login.password')}
                        value={values.password}
                      />
                      <label htmlFor="password-field">{t('login.password')}</label>
                      <div className="invalid-tooltip">{authError ? t(authError) : null}</div>
                    </div>
                    <button className="w-100 mb-3 btn btn-outline-primary" type="submit" disabled={isSubmitting}>
                      {t('login.submit')}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.haveNotAccount')}</span>
                {' '}
                <Link to="/signup">{t('login.signup')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
