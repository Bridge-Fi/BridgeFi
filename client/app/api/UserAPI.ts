import axios from "./axios";
import { LoggedUser, RegisterUser, UpdateUser, User } from "../types/user";

export const UserAPI = {
  async register(userData: RegisterUser) {
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

  async updateUser(userId: number, data: UpdateUser): Promise<User | Error> {
    try {
      const response = await axios.patch(`/users/${userId}`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return new Error(error.response?.data?.message || "Update failed");
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
