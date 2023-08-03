import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './routes/root';
import ErrorPage from './routes/error-page';
import LoginPage from './routes/login-page';
import routes from './routes';
import SignupPage from './routes/signup-page';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <PrivateRoute>
          <Root />
        </PrivateRoute> },
      {
        path: routes.loginPath(),
        element: <LoginPage />,
      },
      {
        path: routes.signupPath(),
        element: <SignupPage />,
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
