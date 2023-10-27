import { http } from "../api";

export const RegisterService = {
  register: (email: string, password: string) => {
    const response = http.post("/auth/register", {
      email: email,
      password: password,
    });

    return response;
  },
};
