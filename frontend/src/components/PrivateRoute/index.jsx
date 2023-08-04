import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.username ? children : <Navigate to="/login" />
  );
};

export default PrivateRoute;
