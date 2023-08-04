import axios from 'axios';
import { useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext.js';
import routes from '../routes';

const AuthProvider = ({ children }) => {
  const savedUsername = localStorage.getItem('username');
  const [username, setUsername] = useState(savedUsername);

  const authorize = (data) => {
    const { username: name, token } = data;
    localStorage.setItem('username', name);
    localStorage.setItem('token', token);
    setUsername(name);
  };

  const logIn = async (logInData) => {
    const { data } = await axios.post(routes.api.loginPath(), logInData);
    authorize(data);
  };

  const logOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUsername('');
  };

  const getToken = () => localStorage.getItem('token');

  const contextValue = useMemo(
    () => ({
      logIn, username, getToken, authorize, logOut,
    }),
    [logIn, username, getToken, authorize, logOut],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
