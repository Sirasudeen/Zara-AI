// frontend/src/context/AuthContext.tsx

import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkAuthStatus, loginUser, logoutUser, signupUser } from "../helpers/api-communicator";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState<boolean>(true); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicRoutes = ["/login", "/signup","/"];
    if (publicRoutes.includes(location.pathname)) {
      setLoading(false);
      return;
    }

    async function checkStatus() {
      try {
        const data = await checkAuthStatus();
        if (data && data.user) {
          setUser({ email: data.user.email, name: data.user.name });
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsLoggedIn(false);
        setUser(null);
        if (!publicRoutes.includes(location.pathname)) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    }
    checkStatus();
  }, [location.pathname, navigate]);

  const login = async (email: string, password: string) => {
    try {
      await loginUser(email, password);
      const authData = await checkAuthStatus();
      if (authData && authData.user) {
        setUser({ email: authData.user.email, name: authData.user.name });
        setIsLoggedIn(true);
        navigate("/chat");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error; 
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      await signupUser(name, email, password);
      const authData = await checkAuthStatus();
      if (authData && authData.user) {
        setUser({ email: authData.user.email, name: authData.user.name });
        setIsLoggedIn(true);
        navigate("/chat"); 
      }
    } catch (error) {
      console.error("Signup failed:", error);
      throw error; 
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error; 
    }
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
  