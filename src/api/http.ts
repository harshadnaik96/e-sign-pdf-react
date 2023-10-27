import axios, { AxiosHeaders } from "axios";
import Cookies from "js-cookie";

export const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

http.interceptors.request.use(
  (config) => {
    const token = Cookies.get("user");
    if (token) {
      (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
