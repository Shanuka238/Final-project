import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, setToken, removeToken, parseJwt, isLoggedIn } from 'utils/auth';

const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token && isLoggedIn()) {
      let userData = parseJwt(token);
      if (userData) {
        userData = {
          id: userData.id || userData._id,
          username: userData.username || '',
          email: userData.email || '',
          role: userData.role || 'user',
          createdAt: userData.createdAt || '',
        };
        setUser(userData);
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    setToken(token);
    let userData = parseJwt(token);
    if (userData) {
      userData = {
        id: userData.id || userData._id,
        username: userData.username || '',
        email: userData.email || '',
        role: userData.role || 'user',
        createdAt: userData.createdAt || '',
      };
      setUser(userData);
    } else {
      setUser(null);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-lg">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
