import axios from "./axios";
import { LoggedUser, RegisterUser, UpdateUser, User } from "../types/user";

export const UserAPI = {
  async register(userData: RegisterUser) {
    const response = await axios.post("/users/register", userData);
    return response;
  },

  async login(email: string, password: string) {
    const response = await axios.post(
      "/users/login",
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );
    return response;
  },

  async getLoggedUser() {
    try {
      const response = await axios.get(
        "/users/get-logged-user",
        { withCredentials: true } // ← ensure cookie goes
      );
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

  async getMyAppointments() {
    try {
      const user = await this.getLoggedUser();
      const response = await axios.get(`/appointments/user/${user.sub}`);
      return response.data;
    } catch (err: any) {
      return new Error(
        err.response?.data?.message || "Failed to load appointments"
      );
    }
  },
};
