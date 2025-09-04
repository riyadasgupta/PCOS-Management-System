import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Axios interceptor setup function
function setupAxiosInterceptors(logout) {
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        // Token expired or invalid - logout user
        logout();
      }
      return Promise.reject(error);
    }
  );
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      axios.get("http://localhost:5000/api/auth/user")
        .then(res => setUser(res.data))
        .catch(() => logout());
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      setUser(null);
    }
  }, [token]);

  // Setup Axios interceptor once on mount
  useEffect(() => {
    setupAxiosInterceptors(logout);
  }, []); // empty deps to run only once

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
