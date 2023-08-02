import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import loginImage from '../assets/login.jpg';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const { t } = useTranslation();

  const auth = useAuth();
  const navigate = useNavigate();
  const usernameInputRef = useRef();
  const [authError, setAuthError] = useState('');

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
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
                  src={loginImage}
                  className="rounded-circle"
                  alt=""
                />
              </div>
              <h1 className="text-center mb-4">{t('login.title')}</h1>
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={async (values) => {
                  setAuthError(false);
                  try {
                    await auth.logIn(values);
                    navigate('/');
                  } catch ({ response }) {
                    const errMsg = (response.status === 401)
                      ? t('login.authError') : t('login.networkError');
                    setAuthError(errMsg);
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
                    {authError ? <div className="text-danger">{t('login.authError')}</div> : null}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="username-field">
                        {t('login.username')}
                      </label>
                      <Field className="form-control" type="text" id="username-field" name="username" placeholder={t('login.username')}
                             onChange={handleChange}
                             onBlur={handleBlur}
                             innerRef={usernameInputRef}
                             value={values.username}
                      />

                      {errors.username && touched.username && <ErrorMessage className="text-danger" name="username" component="div" />}
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="password-field">
                        {t('login.password')}
                      </label>
                      <Field className="form-control" type="password" id="password-field" name="password" placeholder={t('login.password')}
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.password}
                      />

                      {errors.password && touched.password && <ErrorMessage className="text-danger" name="password" component="div" />}
                    </div>
                    <button className="btn btn-outline-primary" type="submit" disabled={isSubmitting}>
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
}