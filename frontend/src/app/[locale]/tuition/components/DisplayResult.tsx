"use client";

import { transactionService } from "@/services/transactionService";
import { useAuthStore } from "@/store/authStore";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function DisplayResult() {
  const { user } = useAuthStore();
  const payerType = user?.sID ? "STUDENT" : "OTHER";
  const [history, setHistory] = useState<any[]>([]);
  const router = useRouter(); // Initialize router

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  const fetchTransactions = async () => {
    try {
      const data = await transactionService.getTransactionOfUser(
        payerType,
        user?.id
      );

      setHistory(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    console.log(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="p-6 shadow-lg bg-white rounded text-center">
        <h2 className="text-2xl font-bold text-green-600">
          Thanh toán thành công!
        </h2>
        <p className="text-gray-600">Cảm ơn bạn đã hoàn thành giao dịch.</p>
      </div>

      <div className="p-4 rounded shadow bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Lịch sử giao dịch</h2>
          <button
            onClick={() => router.push("/tuition/history")} // Chuyển hướng đến trang lịch sử
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Xem tất cả
          </button>
        </div>
        <table className="w-full border-collapse">
          <tbody>
            <div className="w-full max-w-4xl">
              <Table striped hoverable>
                <TableHead>
                  <TableHeadCell>ID</TableHeadCell>
                  <TableHeadCell>Sinh viên</TableHeadCell>
                  <TableHeadCell>Số tiền</TableHeadCell>
                  <TableHeadCell>Tài khoản</TableHeadCell>
                  <TableHeadCell>Ngày giao dịch</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                  {history.map((tx, idx) => (
                    <TableRow
                      key={idx}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <TableCell>{tx.id}</TableCell>
                      <TableCell>
                        {tx.student?.sID} - {tx.student?.name}
                      </TableCell>
                      <TableCell>{formatCurrency(tx.amount)}</TableCell>
                      <TableCell>{tx.paymentAccountType || "-"}</TableCell>
                      <TableCell>
                        {new Date(tx.createdAt).toLocaleDateString("vi-VN")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
}
