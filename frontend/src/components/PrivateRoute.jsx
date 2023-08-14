import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import routes from '../routes';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth?.username ? children : <Navigate to={routes.loginPath()} />
  );
};

export default PrivateRoute;
