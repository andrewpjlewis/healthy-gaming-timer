import { createContext, useContext, useState, useEffect } from 'react';
import { getToken, removeToken, setToken } from '../utils/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (getToken()) setLoggedIn(true);
  }, []);

  const login = (token) => {
    setToken(token);
    setLoggedIn(true);
  };

  const logout = () => {
    removeToken();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
