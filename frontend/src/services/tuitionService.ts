/* eslint-disable @typescript-eslint/no-unused-vars */
import { removeAccessToken, setAccessToken } from "@/utils/token";
import { api } from "@/lib/axios";

import axios, { AxiosResponse } from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/student/tuition`;

export const tuitionService = {
  async createTuition(status: string, studentId: string, fee: number) {
    try {
      const response: AxiosResponse = await axios.post(`${API_URL}/create`, {
        status,
        sID: studentId,
        fee,
      });

      return response.data;
    } catch (error) {
      throw new Error("Failed to sign up");
    }
  },

  async getAllTuitions() {
    try {
      const response: AxiosResponse = await axios.get(`${API_URL}`);

      return response.data;
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  },

  async getStudentTuition(studentId: string) {
    try {
      const response: AxiosResponse = await axios.get(
        `${API_URL}/detail?sID=${studentId}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  },

  async logout() {
    try {
    } catch (error) {
      throw new Error("Failed to log out");
    }
  },
};
