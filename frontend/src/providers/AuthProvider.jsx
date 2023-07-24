import axios from 'axios';
import { useState } from 'react';
import AuthContext from '../contexts/AuthContext.js';

const AuthProvider = ({ children }) => {
  const savedUsername = localStorage.getItem('username');
  const [username, setUsername] = useState(savedUsername);

  const logIn = async (logInData) => {
    const { data } = await axios.post('/api/v1/login', logInData);
    const { username, token } = data;
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    setUsername(username);
  };

  return (
    <AuthContext.Provider value={{logIn, username}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;