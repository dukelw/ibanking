"use client";

import { useState } from "react";
import {
  Label,
  TextInput,
  Button,
  Select,
  Spinner,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";
import { tuitionService } from "@/services/tuitionService";

export default function TuitionLookupPage() {
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [tuitionData, setTuitionData] = useState<any[]>([]);
  const [error, setError] = useState("");

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  const handleLookup = async () => {
    if (!studentId) {
      setError("Vui lòng nhập mã số sinh viên");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await tuitionService.getStudentTuition(studentId, status);
      setTuitionData(data);
    } catch (err: any) {
      setError(err.message || "Không thể tra cứu học phí");
      setTuitionData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6">
      <h1 className="text-2xl font-bold text-[#00713D] mb-6">
        Tra cứu học phí sinh viên
      </h1>

      {/* Form tra cứu */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded p-6 space-y-4">
        <div>
          <Label>Mã số sinh viên</Label>
          <TextInput
            id="studentId"
            placeholder="Nhập MSSV"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>

        <div>
          <Label>Trạng thái</Label>
          <Select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="PENDING">Chưa đóng</option>
            <option value="PAID">Đã đóng</option>
          </Select>
        </div>

        <Button
          onClick={handleLookup}
          disabled={loading}
          className="w-full bg-[#00713D] text-white"
        >
          {loading ? <Spinner size="sm" /> : "Tra cứu"}
        </Button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {/* Kết quả */}
        <div className="w-full max-w-4xl mt-8">
          {tuitionData.length > 0 ? (
            <Table striped hoverable>
              <TableHead>
                <TableHeadCell>MSSV</TableHeadCell>
                <TableHeadCell>Tên sinh viên</TableHeadCell>
                <TableHeadCell>Số tiền</TableHeadCell>
                <TableHeadCell>Trạng thái</TableHeadCell>
                <TableHeadCell>Thời gian bắt đầu</TableHeadCell>
                <TableHeadCell>Thời gian kết thúc</TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                {tuitionData.map((item, idx) => (
                  <TableRow
                    key={idx}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell>{item.student?.sID}</TableCell>
                    <TableCell>{item.student?.name}</TableCell>
                    <TableCell>{formatCurrency(item.fee)}</TableCell>
                    <TableCell>
                      {item.status === "PAID" ? (
                        <span className="text-green-600 font-medium">
                          Đã đóng
                        </span>
                      ) : (
                        <span className="text-red-600 font-medium">
                          Chưa đóng
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.startTime?.split("T")[0] || "-"}
                    </TableCell>
                    <TableCell>{item.endTime?.split("T")[0] || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            !loading && (
              <p className="text-gray-500 text-center">
                Chưa có dữ liệu học phí
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
