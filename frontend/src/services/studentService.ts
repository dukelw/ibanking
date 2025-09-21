/* eslint-disable @typescript-eslint/no-unused-vars */
import { removeAccessToken, setAccessToken } from "@/utils/token";
import { api } from "@/lib/axios";

import axios, { AxiosResponse } from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/student`;

export const studentService = {
  // Đăng nhập
  async signIn(studentId: string, password: string) {
    try {
      const response: AxiosResponse = await axios.post(`${API_URL}/login`, {
        sID: studentId,
        password,
      });

      return response.data;
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  },

  async payTuition(
    studentId: string,
    tuitionId: number,
    payerId: number,
    payerType: string
  ) {
    try {
      const response: AxiosResponse = await axios.post(
        `${API_URL}/${studentId}/pay-tuition`,
        {
          sID: studentId,
          tuitionId,
          payerId,
          payerType,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  },

  async getStudent(id: number) {
    try {
      const response: AxiosResponse = await axios.get(`${API_URL}/${id}`);

      return response.data;
    } catch (error) {
      throw new Error("Error when get student tuition");
    }
  },

  async logout() {
    try {
    } catch (error) {
      throw new Error("Failed to log out");
    }
  },
};
