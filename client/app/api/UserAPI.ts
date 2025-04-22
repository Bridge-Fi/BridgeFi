import axios from "./axios";

export const UserAPI = {
  async register(userData: any) {
    const response = await axios.post("/users/register", userData);
    return response;
  },

  async login(email: string, password: string) {
    const response = await axios.post("/users/login", {
      email: email,
      password: password,
    });
    return response;
  },

  async getLoggedUser() {
    try {
      const response = await axios.get("/users/get-logged-user");
      return response.data;
    } catch {
      return new Error("You are not authenticated");
    }
  },
};
