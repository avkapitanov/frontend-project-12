import {
  createBrowserRouter, Navigate,
  RouterProvider,
} from "react-router-dom";

import Root from './routes/root';
import ErrorPage from './routes/error-page';
import LoginPage from './routes/login-page';
import AuthProvider from './providers/AuthProvider';
import { useAuth } from './hooks/useAuth';
import routes from './routes';
import SignupPage from './routes/signup-page';
import Layout from './components/Layout';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.username ? children : <Navigate to='/login' />
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <PrivateRoute>
          <Root />
        </PrivateRoute> },
      {
        path: routes.rootPath(),
        element:
          <PrivateRoute>
            <Root />
          </PrivateRoute>,
        errorElement: <ErrorPage />,
      },
      {
        path: routes.loginPath(),
        element: <LoginPage />,
      },
      {
        path: routes.signupPath(),
        element: <SignupPage />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
     <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
