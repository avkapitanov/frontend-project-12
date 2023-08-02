import axios from 'axios';
import { useState } from 'react';
import AuthContext from '../contexts/AuthContext.js';
import routes from '../routes';

const AuthProvider = ({ children }) => {
  const savedUsername = localStorage.getItem('username');
  const [username, setUsername] = useState(savedUsername);

  const authorize = (data) => {
    const { username, token } = data;
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    setUsername(username);
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

  return (
    <AuthContext.Provider value={{logIn, username, getToken, authorize, logOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;