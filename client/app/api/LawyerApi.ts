import { UpdateLawyer } from "../types/lawyer";
import axios from "./axios";

export const LawyerApi = {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(
        "/lawyers/login",
        { email, password },
        { withCredentials: true } // ← this is critical!
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getLawyers() {
    try {
      const response = await axios.get("/lawyers", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return new Error("Failed to fetch lawyers");
    }
  },

  async registerLawyer(values: any) {
    try {
      const response = await axios.post("/lawyers", values, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
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

  async updateLawyer(id: number, values: UpdateLawyer) {
    try {
      const response = await axios.patch(`/lawyers/${id}`, values);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteLawyer(id: number) {
    try {
      const response = await axios.delete(`/lawyers/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async bookAppointment(data: {
    lawyerId: number;
    clientName: string;
    clientEmail: string;
    inquiry: string;
  }) {
    try {
      const response = await axios.post("/lawyers/appointments", data);
      return response.data;
    } catch (error: any) {
      return new Error(error.response?.data?.message || "Booking failed");
    }
  },
};
