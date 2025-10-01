/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

interface CheckInformationProps {
  payer: any;
  studentInfo: any;
  payment: any;
  setStudentInfo: (info: any) => void;
  setPayment: (payment: any) => void;
  onNext: () => void;
  onSendOtp: () => void;
}

export default function CheckInformation({
  payer,
  studentInfo,
  payment,
  setStudentInfo,
  setPayment,
  onNext,
  onSendOtp,
}: CheckInformationProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendOtp();
    onNext();
  };

  const inputStyle =
    "w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white disabled:bg-gray-100";

  const labelStyle = "block text-sm font-medium text-gray-700";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 shadow-lg bg-white rounded"
    >
      {/* Người nộp tiền */}
      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded shadow-inner space-y-3">
          <h2 className="font-semibold text-gray-700 mb-2">Người nộp tiền</h2>
          <div>
            <label className={labelStyle}>Họ và tên</label>
            <input className={inputStyle} value={payer.fullName} readOnly />
          </div>
          <div>
            <label className={labelStyle}>Số điện thoại</label>
            <input className={inputStyle} value={payer.phone} readOnly />
          </div>
          <div>
            <label className={labelStyle}>Email</label>
            <input className={inputStyle} value={payer.email} readOnly />
          </div>
        </div>

        {/* Thông tin học phí */}
        <div className="p-4 bg-gray-50 rounded shadow-inner space-y-3">
          <h2 className="font-semibold text-gray-700 mb-2">
            Thông tin học phí
          </h2>
          <div>
            <label className={labelStyle}>Mã số sinh viên</label>
            <input
              className={inputStyle}
              type="text"
              value={studentInfo.studentId}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, studentId: e.target.value })
              }
              placeholder="Nhập MSSV"
            />
          </div>
          <div>
            <label className={labelStyle}>Họ tên sinh viên</label>
            <input
              className={inputStyle}
              type="text"
              value={studentInfo.studentName}
              readOnly
            />
          </div>
          <div>
            <label className={labelStyle}>Số tiền cần nộp</label>
            <input
              className={inputStyle}
              type="number"
              value={studentInfo.tuitionAmount || ""}
              readOnly
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelStyle}>Thời gian bắt đầu</label>
              <input
                className={inputStyle}
                type="date"
                value={
                  studentInfo.startTime
                    ? studentInfo.startTime.split("T")[0]
                    : ""
                }
                readOnly
              />
            </div>
            <div>
              <label className={labelStyle}>Thời gian kết thúc</label>
              <input
                className={inputStyle}
                type="date"
                value={
                  studentInfo.endTime ? studentInfo.endTime.split("T")[0] : ""
                }
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      {/* Thanh toán */}
      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded shadow-inner space-y-3">
          <h2 className="font-semibold text-gray-700 mb-2">
            Thông tin thanh toán
          </h2>
          <div>
            <label className={labelStyle}>Số dư khả dụng</label>
            <input
              className={inputStyle}
              value={payer.balance || ""}
              readOnly
            />
          </div>
          <div>
            <label className={labelStyle}>Số tiền thanh toán</label>
            <input
              className={inputStyle}
              value={payment.amountToPay || ""}
              readOnly
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              className="text-[#00713D]"
              type="checkbox"
              checked={payment.agreedTerms}
              onChange={(e) =>
                setPayment({ ...payment, agreedTerms: e.target.checked })
              }
            />
            <span>Tôi đồng ý với các điều khoản của hệ thống</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-[#00713D] text-white rounded disabled:opacity-50"
          disabled={
            !payment.agreedTerms || // chưa đồng ý điều khoản
            !studentInfo.studentId || // chưa nhập MSSV
            !studentInfo.tuitionAmount || // chưa có học phí
            studentInfo.tuitionAmount <= 0 || // học phí không hợp lệ
            payer.balance < studentInfo.tuitionAmount
          }
        >
          Xác nhận giao dịch
        </button>
      </div>
    </form>
  );
}
