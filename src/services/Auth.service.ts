import { http } from "../api";

export const AuthService = {
  login: (email: string, password: string) => {
    const response = http.post("/auth/login", {
      email: email,
      password: password,
    });
    return response;
  },
};
