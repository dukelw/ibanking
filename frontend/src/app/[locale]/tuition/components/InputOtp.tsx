"use client";

import { useState, useEffect, useRef } from "react";

interface InputOtpProps {
  otp: string;
  setOtp: (val: string) => void;
  onConfirm: () => void;
  onResend: () => void; // Hàm gửi OTP
}

export default function InputOtp({ otp, setOtp, onConfirm, onResend }: InputOtpProps) {
  const [seconds, setSeconds] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Gửi OTP lần đầu khi component mount
  useEffect(() => {
    setSeconds(60);

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // <- chỉ chạy 1 lần khi mount

  const handleResend = () => {
    onResend();
    setCanResend(false);
    setSeconds(60);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

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

      <button
        type="button"
        onClick={handleResend}
        disabled={!canResend}
        className={`w-full p-2 rounded transition-colors ${
          canResend ? "bg-green-600 text-white rounded" : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        {canResend ? "Gửi lại OTP" : `Gửi lại sau ${seconds}s`}
      </button>
    </div>
  );
}
