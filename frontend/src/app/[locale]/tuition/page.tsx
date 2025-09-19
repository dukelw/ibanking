"use client";

import { useState } from "react";

export default function TuitionPage() {
  const [payer, setPayer] = useState({ fullName: "", phone: "", email: "" });
  const [studentInfo, setStudentInfo] = useState({
    studentId: "",
    studentName: "",
    tuitionAmount: 0,
  });
  const [payment, setPayment] = useState({
    balance: 0,
    amountToPay: 0,
    agreedTerms: false,
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [history, setHistory] = useState([
    { date: "2025-09-01", description: "Thanh toán học phí MSSV 12345" },
    { date: "2025-08-01", description: "Thanh toán học phí MSSV 67890" },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const handleConfirmOtp = () => {
    alert("Thanh toán thành công! (Demo)");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">Thanh toán học phí</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 shadow-lg bg-white rounded">
          {/* Cột trái */}
          <div className="space-y-6">
            {/* Người nộp tiền */}
            <div className="p-4 bg-gray-50 rounded shadow-inner space-y-3">
              <h2 className="font-semibold text-gray-700">Người nộp tiền</h2>
              <input
                type="text"
                className="w-full p-2 rounded bg-white shadow-sm outline-none border-none"
                value={payer.fullName}
                readOnly
                placeholder="Họ và tên"
              />
              <input
                type="text"
                className="w-full p-2 rounded bg-white shadow-sm outline-none border-none"
                value={payer.phone}
                readOnly
                placeholder="Số điện thoại"
              />
              <input
                type="email"
                className="w-full p-2 rounded bg-white shadow-sm outline-none border-none"
                value={payer.email}
                readOnly
                placeholder="Email"
              />
            </div>

            {/* Thông tin học phí */}
            <div className="p-4 bg-gray-50 rounded shadow-inner space-y-3">
              <h2 className="font-semibold text-gray-700">Thông tin học phí</h2>
              <input
                type="text"
                className="w-full p-2 rounded bg-white shadow-sm outline-none border-none"
                value={studentInfo.studentId}
                onChange={(e) =>
                  setStudentInfo({ ...studentInfo, studentId: e.target.value })
                }
                placeholder="Mã số sinh viên"
              />
              <input
                type="text"
                className="w-full p-2 rounded bg-white shadow-sm outline-none border-none"
                value={studentInfo.studentName}
                onChange={(e) =>
                  setStudentInfo({
                    ...studentInfo,
                    studentName: e.target.value,
                  })
                }
                placeholder="Họ tên sinh viên"
              />
              <input
                type="number"
                className="w-full p-2 rounded bg-gray-100 outline-none border-none"
                value={studentInfo.tuitionAmount || ""}
                readOnly
                placeholder="Số tiền cần nộp"
              />
            </div>
          </div>

          {/* Cột phải */}
          <div className="space-y-6">
            {/* Thông tin thanh toán */}
            <div className="p-4 bg-gray-50 rounded shadow-inner space-y-3">
              <h2 className="font-semibold text-gray-700">
                Thông tin thanh toán
              </h2>
              <input
                type="number"
                className="w-full p-2 rounded bg-gray-100 outline-none border-none"
                value={payment.balance || ""}
                readOnly
                placeholder="Số dư khả dụng"
              />
              <input
                type="number"
                className="w-full p-2 rounded bg-gray-100 outline-none border-none"
                value={payment.amountToPay || ""}
                readOnly
                placeholder="Số tiền thanh toán"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={payment.agreedTerms}
                  onChange={(e) =>
                    setPayment({ ...payment, agreedTerms: e.target.checked })
                  }
                />
                <span>Tôi đồng ý với các điều khoản của hệ thống</span>
              </div>
            </div>

            {/* Button / OTP */}
            {!otpSent ? (
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded disabled:opacity-50"
                disabled={!payment.agreedTerms}
              >
                Xác nhận giao dịch
              </button>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full p-2 rounded bg-white shadow-sm"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Mã OTP"
                />
                <button
                  type="button"
                  onClick={handleConfirmOtp}
                  className="w-full p-2 bg-green-600 text-white rounded"
                >
                  Xác nhận OTP
                </button>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Lịch sử giao dịch */}
      <div className="p-4 rounded shadow bg-white">
        <h2 className="font-semibold mb-4">Lịch sử giao dịch</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Ngày giao dịch</th>
              <th className="p-2 text-left">Nội dung</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="p-2">{item.date}</td>
                <td className="p-2">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
