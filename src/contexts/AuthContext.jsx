import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      setError(null);
      // Simulate login
      const mockUser = {
        email,
        username: email.split('@')[0],
        id: '123'
      };
      setUser(mockUser);
      navigate('/app');
    } catch (err) {
      setError('Login failed');
      throw err;
    }
  };

  const signup = async (email, password, username) => {
    try {
      setError(null);
      // Simulate signup
      const mockUser = {
        email,
        username,
        id: '123'
      };
      setUser(mockUser);
      navigate('/app');
    } catch (err) {
      setError('Signup failed');
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  const useDemoAccount = async () => {
    try {
      await login('demo@example.com', 'password123');
    } catch (err) {
      setError('Failed to use demo account');
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    useDemoAccount,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 