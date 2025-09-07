import React, { useState, useEffect, createContext } from 'react'
import api from '../api/axios'

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if(token) {
          localStorage.setItem('token', token);
          const response = await api.get('/auth/profile', {
            headers: { Authorization: `Bearer ${token}`}
          });

          setUser(response.data.user);
        }else {
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (error) {
        console.log(`Error fetching profile: ${error}`);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }

    fetchProfile();
  }, [token]);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    setToken(response.data.token);
    return response;
  };

  const signup = async (username, email, password) => {
    return await api.post('/auth/signup', { username, email, password });
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setToken, login,  signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}