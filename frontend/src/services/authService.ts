/* eslint-disable @typescript-eslint/no-unused-vars */
import { removeAccessToken, setAccessToken } from "@/utils/token";
import { api } from "@/lib/axios";

import axios, { AxiosResponse } from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export const authService = {
  async signUp(email: string, password: string, name: string) {
    try {
      const response: AxiosResponse = await axios.post(`${API_URL}/register`, {
        email,
        password,
        name,
      });

      return response.data;
    } catch (error) {
      throw new Error("Failed to sign up");
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
