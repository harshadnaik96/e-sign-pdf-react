import { http } from "../api";

export const DocumentService = {
  docs: (data: FormData) => {
    const response = http.post("/doc/sign", data);
    return response;
  },
};
