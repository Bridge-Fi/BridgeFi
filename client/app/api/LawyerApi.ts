import { UpdateLawyer } from "../types/lawyer";
import axios from "./axios";

export const LawyerApi = {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(
        "/lawyers/login",
        { email, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getLawyers() {
    try {
      const response = await axios.get("/lawyers");
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
    appointmentDate: string; // ISO string
    inquiry: string;
  }) {
    const { lawyerId, appointmentDate, inquiry } = data;

    try {
      const response = await axios.post("/appointments", {
        lawyerId,
        appointmentDate,
        inquiry,
      });
      return response.data;
    } catch (error: any) {
      return new Error(error.response?.data?.message || "Booking failed");
    }
  },

  /** Lawyer fetches their own appointments */
  async getAppointmentsByLawyer(lawyerId: number) {
    try {
      const response = await axios.get(`/appointments/lawyer/${lawyerId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return new Error(
        error.response?.data?.message || "Failed to load appointments"
      );
    }
  },

  async updateAppointmentStatus(
    appointmentId: number,
    status: "accepted" | "rejected"
  ) {
    try {
      const response = await axios.patch(
        `/appointments/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      return new Error(
        error.response?.data?.message || "Failed to update appointment"
      );
    }
  },
};
