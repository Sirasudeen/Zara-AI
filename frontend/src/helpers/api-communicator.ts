import axios from "axios";

// Login function with simplified error handling
export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await axios.post("/user/login", { email, password });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unable to login");
  }
};

// Signup function with simplified error handling
export const signupUser = async (name: string, email: string, password: string) => {
  try {
    const { data } = await axios.post("/user/signup", { name, email, password });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unable to sign up");
  }
};

// Check authentication status
export const checkAuthStatus = async () => {
  try {
    const { data } = await axios.get("/user/auth-status");
    return data;
  } catch (error) {
    throw new Error("Unable to authenticate");
  }
};

// Send chat message
export const sendChatRequest = async (message: string) => {
  try {
    console.log(message);
    const { data } = await axios.post("/chat/new", { message });
    return data;
    

  } catch (error) {
    throw new Error("Unable to send chat");
  }
};

// Get all user chats
export const getUserChats = async () => {
  try {
    const { data } = await axios.get("/chat/all-chats");
    return data;
  } catch (error) {
    throw new Error("Unable to retrieve chats");
  }
};

// Delete user chats
export const deleteUserChats = async () => {
  try {
    const { data } = await axios.delete("/chat/delete");
    return data;
  } catch (error) {
    throw new Error("Unable to delete chats");
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const { data } = await axios.get("/user/logout");
    return data;
  } catch (error) {
    throw new Error("Unable to log out");
  }
};
