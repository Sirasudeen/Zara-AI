import axios, { AxiosError } from "axios";

// Set the base URL for Axios requests
axios.defaults.baseURL = "http://localhost:5000"; // Adjust the base URL as per your backend configuration

// Set up Axios interceptors to include the auth token in headers
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Adjust based on where you store the token
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Login function with improved error handling and token management
export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await axios.post("/user/login", { email, password });
    // Store the token in localStorage or cookies
    localStorage.setItem("token", data.token);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Unable to login");
    } else {
      throw new Error("Unable to login");
    }
  }
};

// Signup function with improved error handling and token management
export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const { data } = await axios.post("/user/signup", {
      name,
      email,
      password,
    });
    // Store the token
    localStorage.setItem("token", data.token);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Unable to sign up");
    } else {
      throw new Error("Unable to sign up");
    }
  }
};

// Check authentication status
export const checkAuthStatus = async () => {
  try {
    const { data } = await axios.get("/user/auth-status");
    return data;
  } catch (error: unknown) {
    throw new Error("Unable to authenticate");
  }
};

// Send chat message
export const sendChatRequest = async (message: string) => {
  try {
    console.log(message);
    const { data } = await axios.post("/chat/new", { message });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Unable to send chat");
    } else {
      throw new Error("Unable to send chat");
    }
  }
};

// Get all user chats
export const getUserChats = async () => {
  try {
    const { data } = await axios.get("/chat/all-chats");
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Unable to retrieve chats"
      );
    } else {
      throw new Error("Unable to retrieve chats");
    }
  }
};

// Delete user chats
export const deleteUserChats = async () => {
  try {
    const { data } = await axios.delete("/chat/delete");
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Unable to delete chats");
    } else {
      throw new Error("Unable to delete chats");
    }
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const { data } = await axios.get("/user/logout");
    // Remove the token from localStorage
    localStorage.removeItem("token");
    return data;
  } catch (error: unknown) {
    throw new Error("Unable to log out");
  }
};
