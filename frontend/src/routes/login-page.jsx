import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function LoginPage() {
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <h1>Login</h1>
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
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
                        Username
                      </label>
                      <Field className="form-control" type="text" id="username-field" name="username" placeholder="Username"
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.username}
                      />

                      {errors.username && touched.username && <ErrorMessage className="text-danger" name="username" component="div" />}
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="password-field">
                        Password
                      </label>
                      <Field className="form-control" type="password" id="password-field" name="password" placeholder="Password"
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.password}
                      />

                      {errors.password && touched.password && <ErrorMessage className="text-danger" name="password" component="div" />}
                    </div>
                    <button className="btn btn-outline-primary" type="submit" disabled={isSubmitting}>
                      Submit
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