/* eslint-disable @typescript-eslint/no-unused-vars */
import { removeAccessToken, setAccessToken } from "@/utils/token";
import { api } from "@/lib/axios";

import axios, { AxiosResponse } from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/notification/otp`;

export const otpService = {
  async genearateOtp(userId: string, email: string, transactionId?: string) {
    try {
      const response: AxiosResponse = await axios.post(`${API_URL}/generate`, {
        userId,
        email,
        transactionId,
      });

      return response.data;
    } catch (error) {
      throw new Error("Failed to generate OTP");
    }
  },

  async verifyOtp(userId: string, code: string) {
    try {
      const response: AxiosResponse = await axios.post(`${API_URL}/verify`, {
        userId,
        code,
      });

      return response.data;
    } catch (error) {
      throw new Error("Failed to generate OTP");
    }
  },

  async logout() {
    try {
    } catch (error) {
      throw new Error("Failed to log out");
    }
  },
};
