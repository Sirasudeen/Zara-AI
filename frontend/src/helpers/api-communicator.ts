
import axios, { AxiosError } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true; // Ensures cookies are sent with every request

console.log(`Axios Base URL: ${axios.defaults.baseURL}`);

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access - Redirecting to login.");
      window.location.href = "/login"; // Uncomment to enable redirect
    }
    return Promise.reject(error);
  }
);


/**
 * User Login
 * @param email
 * @param password 
 * @returns 
 */
export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await axios.post("/user/login", { email, password });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Unable to login");
    } else {
      throw new Error("Unable to login");
    }
  }
};

/**
 * User Signup
 * @param name 
 * @param email 
 * @param password 
 * @returns 
 */
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
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Unable to sign up");
    } else {
      throw new Error("Unable to sign up");
    }
  }
};

/**
 * @returns Response data confirming authentication
 */
export const checkAuthStatus = async () => {
  try {
    const { data } = await axios.get("/user/auth-status");
    return data;
  } catch (error: unknown) {
    throw new Error("Unable to authenticate");
  }
};

/**
 * Send Chat Request
 * @param message - Chat message
 * @returns Response data
 */
export const sendChatRequest = async (message: string) => {
  try {
    console.log(`Sending message: ${message}`);
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

/**
 * Get User Chats
 * @returns Response data containing user chats
 */
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

/**
 * Delete User Chats
 * @returns Response data confirming deletion
 */
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

/**
 * User Logout
 * @returns Response data confirming logout
 */
export const logoutUser = async () => {
  try {
    const { data } = await axios.post("/user/logout");
    return data;
  } catch (error: unknown) {
    throw new Error("Unable to log out");
  }
};
