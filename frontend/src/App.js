import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './routes/root';
import ErrorPage from './routes/error-page';
import LoginPage from './routes/login-page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
