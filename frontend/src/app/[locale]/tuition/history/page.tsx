"use client";

import { useEffect, useState } from "react";
import {
  Label,
  TextInput,
  Button,
  Spinner,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";
import { useAuthStore } from "@/store/authStore";
import { transactionService } from "@/services/transactionService";
import { studentService } from "@/services/studentService";

export default function History() {
  const { user } = useAuthStore();
  const payerType = user?.sID ? "STUDENT" : "OTHER";

  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  const fetchTransactions = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await transactionService.getTransactionOfUser(
        payerType,
        user?.id
      );

      // filter theo khoảng thời gian nếu có
      let filtered = data;
      if (fromDate) {
        filtered = filtered.filter(
          (tx: any) => new Date(tx.createdAt) >= new Date(fromDate)
        );
      }
      if (toDate) {
        filtered = filtered.filter(
          (tx: any) => new Date(tx.createdAt) <= new Date(toDate)
        );
      }

      // gọi studentService để enrich data
      const enriched = await Promise.all(
        filtered.map(async (tx: any) => {
          try {
            const student = await studentService.getStudentByStudentId(
              tx.studentId
            );
            return { ...tx, student }; // thêm field student
          } catch (err) {
            console.error(`Không lấy được student ${tx.studentId}`, err);
            return { ...tx, student: null };
          }
        })
      );

      setTransactions(enriched);
    } catch (err: any) {
      setError(err.message || "Không thể lấy lịch sử giao dịch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6">
      <h1 className="text-2xl font-bold text-[#00713D] mb-6">
        Lịch sử giao dịch
      </h1>

      {/* Filter theo ngày */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded p-6 space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fromDate">Từ ngày</Label>
            <TextInput
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="toDate">Đến ngày</Label>
            <TextInput
              type="date"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
        <Button
          onClick={fetchTransactions}
          disabled={loading}
          className="w-full bg-[#00713D] text-white"
        >
          {loading ? <Spinner size="sm" /> : "Lọc giao dịch"}
        </Button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Bảng lịch sử */}
      <div className="w-full max-w-4xl">
        {transactions.length > 0 ? (
          <Table striped hoverable>
            <TableHead>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell>Sinh viên</TableHeadCell>
              <TableHeadCell>Số tiền</TableHeadCell>
              <TableHeadCell>Tài khoản</TableHeadCell>
              <TableHeadCell>Ngày giao dịch</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {transactions.map((tx, idx) => (
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
                    {new Date(tx.createdAt).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          !loading && (
            <p className="text-gray-500 text-center">
              Không có giao dịch nào trong khoảng thời gian này
            </p>
          )
        )}
      </div>
    </div>
  );
}
