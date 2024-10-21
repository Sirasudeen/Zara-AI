  import axios, { AxiosError } from "axios";

  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  export const loginUser = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("/user/login", { email, password });
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

  export const checkAuthStatus = async () => {
    try {
      const { data } = await axios.get("/user/auth-status");
      return data;
    } catch (error: unknown) {
      throw new Error("Unable to authenticate");
    }
  };

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

  export const logoutUser = async () => {
    try {
      const { data } = await axios.get("/user/logout");
      localStorage.removeItem("token");
      return data;
    } catch (error: unknown) {
      throw new Error("Unable to log out");
    }
  };
