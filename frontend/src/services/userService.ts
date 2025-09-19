/* eslint-disable @typescript-eslint/no-unused-vars */
import { removeAccessToken, setAccessToken } from "@/utils/token";
import { api } from "@/lib/axios";

import axios, { AxiosResponse } from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/student`;

export const studentService = {
  async signUp(studentId: string, password: string, name: string) {
    try {
      const response: AxiosResponse = await axios.post(`${API_URL}/register`, {
        sID: studentId,
        password,
        name,
      });

      return response.data;
    } catch (error) {
      throw new Error("Failed to sign up");
    }
  },

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

  async logout() {
    try {
    } catch (error) {
      throw new Error("Failed to log out");
    }
  },
};
