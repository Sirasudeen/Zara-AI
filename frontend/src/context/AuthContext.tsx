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
  const [loading, setLoading] = useState<boolean>(true); // To handle initial auth check
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Prevent auth check on public routes
    const publicRoutes = ["/login", "/signup","/"];
    if (publicRoutes.includes(location.pathname)) {
      setLoading(false);
      return;
    }

    // Fetch if the user's cookies are valid, then set auth state
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
        // Redirect to login only if not already on a public route
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
      // After login, fetch auth status to get user info
      const authData = await checkAuthStatus();
      if (authData && authData.user) {
        setUser({ email: authData.user.email, name: authData.user.name });
        setIsLoggedIn(true);
        navigate("/chat"); // Redirect to chat after successful login
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Rethrow to handle in components
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      await signupUser(name, email, password);
      // After signup, fetch auth status to get user info
      const authData = await checkAuthStatus();
      if (authData && authData.user) {
        setUser({ email: authData.user.email, name: authData.user.name });
        setIsLoggedIn(true);
        navigate("/chat"); // Redirect to chat after successful signup
      }
    } catch (error) {
      console.error("Signup failed:", error);
      throw error; // Rethrow to handle in components
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      setUser(null);
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Logout failed:", error);
      throw error; // Rethrow to handle in components
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
    return <div>Loading...</div>; // Or a spinner/loading indicator
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
  