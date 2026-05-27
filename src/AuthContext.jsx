import React, { createContext, useContext, useEffect, useState } from "react";
import api from "./api";
import { clearRecentlyViewed } from "./utils/store";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("isAuthenticated")) || false;
    } catch (e) {
      return false;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (e) {
      return null;
    }
  });

  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("login");

  useEffect(() => {
    try {
      localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
      localStorage.setItem("user", JSON.stringify(user));
    } catch (e) {}
  }, [isAuthenticated, user]);

  const setUserAndAuth = (userData, token) => {
    try {
      if (token) api.setToken(token);
    } catch (e) {}
    setUser(userData || { name: "User" });
    setIsAuthenticated(true);
    setLoginPromptOpen(false);
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    try {
      api.clearToken();
    } catch (e) {}
    try {
      clearRecentlyViewed();
    } catch (e) {}
  };

  // Auth functions: try backend if API_BASE configured, otherwise fallback to mock localStorage
  const signup = async ({ name, email, password }) => {
    if (api.API_BASE) {
      const res = await api.apiPost("/auth/signup", { name, email, password });
      const token = res?.token;
      const userData = res?.user || { name, email };
      setUserAndAuth(userData, token);
      return userData;
    }

    // fallback mock
    try {
      const raw = localStorage.getItem("users");
      const users = raw ? JSON.parse(raw) : [];
      if (users.find((u) => u.email === email)) {
        throw new Error("Email already registered");
      }
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      setUserAndAuth({ name, email }, null);
      return { name, email };
    } catch (e) {
      throw e;
    }
  };

  const login = async ({ email, password }) => {
    if (api.API_BASE) {
      const res = await api.apiPost("/auth/login", { email, password });
      const token = res?.token;
      const userData = res?.user || { email };
      setUserAndAuth(userData, token);
      return userData;
    }

    // fallback mock
    try {
      const raw = localStorage.getItem("users");
      const users = raw ? JSON.parse(raw) : [];
      const found = users.find(
        (u) => u.email === email && u.password === password,
      );
      if (!found) throw new Error("Invalid credentials");
      setUserAndAuth({ name: found.name, email: found.email }, null);
      return { name: found.name, email: found.email };
    } catch (e) {
      throw e;
    }
  };

  const openLogin = () => setLoginPromptOpen(true);
  const closeLogin = () => setLoginPromptOpen(false);

  const openAuth = (tab = "login") => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };
  const closeAuth = () => setAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        signup,
        loginPromptOpen,
        openLogin,
        closeLogin,
        authModalOpen,
        authModalTab,
        openAuth,
        closeAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
