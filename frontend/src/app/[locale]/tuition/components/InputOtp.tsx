"use client";

interface InputOtpProps {
  otp: string;
  setOtp: (val: string) => void;
  onConfirm: () => void;
}

export default function InputOtp({ otp, setOtp, onConfirm }: InputOtpProps) {
  return (
    <div className="p-6 shadow-lg bg-white rounded space-y-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-center">Xác nhận OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Mã OTP"
        className="w-full p-2 border rounded"
      />
      <button
        type="button"
        onClick={onConfirm}
        className="w-full p-2 bg-green-600 text-white rounded"
      >
        Xác nhận OTP
      </button>
    </div>
  );
}
