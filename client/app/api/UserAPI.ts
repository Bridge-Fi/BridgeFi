import axios from "./axios";
import { UpdateUser } from "../types/user";

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

  async logout() {
    try {
      const response = await axios.post(
        "/users/logout",
        {},
        { withCredentials: true }
      );
      console.log("You are successfully logged out");
      return response;
    } catch (error) {
      return new Error("Logout failed");
    }
  },

  async updateUser(id: number, values: UpdateUser) {
    try {
      const response = await axios.patch(`/users/${id}`, values);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(id: number) {
    try {
      const response = await axios.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
