import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../constants/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigateTo = (url) => {
    window.location.href = url;
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    api
      .get("/isAuthenticated")
      .then((res) => {
        setIsAuthenticated(res.data.isAuthenticated);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const login = async () => {
    api
      .get("/request")
      .then((res) => {
        navigateTo(res.data.url);
        checkAuthentication();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const logout = async () => {
    api
      .get("/logout")
      .then((res) => {
        alert(res.data.message);
        checkAuthentication();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
