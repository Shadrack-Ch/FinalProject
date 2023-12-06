// src/hooks/useAuth.js

import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to log in the user
  const login = async (credentials) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set('authToken', data.token, { secure: true, path: '/' });
        setUser(data.user); // Assuming the response includes user data
        setIsAuthenticated(true);
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Function to log out the user
  const logout = () => {
    Cookies.remove('authToken', { path: '/' });
    setUser(null);
    setIsAuthenticated(false);
  };

  // Function to check the user's authentication status
  const checkAuth = useCallback(async () => {
    const token = Cookies.get('authToken');
    if (token) {
      try {
        // Verify token and get user data from server
        const response = await fetch('/api/verifyToken', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        logout();
      }
    }
  }, []);

  // Effect to check authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { user, isAuthenticated, login, logout };
};

export default useAuth;
