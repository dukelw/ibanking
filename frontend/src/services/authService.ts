/* eslint-disable @typescript-eslint/no-unused-vars */
import { removeAccessToken, setAccessToken } from "@/utils/token";
import { api } from "@/lib/axios";

import axios, { AxiosResponse } from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/user`;

export const authService = {
  async getUser(id: number) {
    try {
      const response: AxiosResponse = await axios.get(`${API_URL}/${id}`);

      return response.data;
    } catch (error) {
      throw new Error("Error when get student tuition");
    }
  },

  // Đăng nhập
  async signIn(email: string, password: string) {
    try {
      const response: AxiosResponse = await axios.post(`${API_URL}/login`, {
        email,
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
