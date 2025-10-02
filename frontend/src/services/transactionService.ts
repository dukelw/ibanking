/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/lib/axios";
import axios, { AxiosResponse } from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/transactions`;

export const transactionService = {
  // Lấy tất cả transactions
  async getAllTransactions() {
    try {
      const response: AxiosResponse = await axios.get(`${API_URL}/all`);
      return response.data;
    } catch (error) {
      throw new Error("Error when get all transactions");
    }
  },

  // Lấy transaction theo ID
  async getTransactionById(id: number) {
    try {
      const response: AxiosResponse = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Transaction not found");
    }
  },

  // Lấy transactions của user theo payerType và userId
  async getTransactionOfUser(payerType: string, userId: number) {
    try {
      const response: AxiosResponse = await axios.get(
        `${API_URL}/user/${payerType}/${userId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error when get transactions of user");
    }
  },

  // (Option) Tạo transaction mới
  async createTransaction(
    amount: number,
    paymentUserId: number,
    paymentAccountType: string,
    studentId: string
  ) {
    try {
      const response: AxiosResponse = await axios.post(`${API_URL}/create`, {
        amount,
        paymentUserId,
        paymentAccountType,
        studentId,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to create transaction");
    }
  },
};
