"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { tuitionService } from "@/services/tuitionService";
import { otpService } from "@/services/optService";
import { toast } from "react-toastify";
import CheckInformation from "./components/CheckInformation";
import InputOtp from "./components/InputOtp";
import DisplayResult from "./components/DisplayResult";
import { useDebounce } from "@/app/hooks/useDebounce";
import { studentService } from "@/services/studentService";
import { authService } from "@/services/authService";
import { findCurrentTuition } from "@/helper";
import { STEPS } from "@/constants";

export default function TuitionPage() {
  const { user, setUser } = useAuthStore();
  const [step, setStep] = useState(1);

  const [payer, setPayer] = useState({
    fullName: "",
    phone: "",
    email: "",
    balance: 0,
  });
  const [studentInfo, setStudentInfo] = useState({
    studentId: "",
    studentName: "",
    tuitionAmount: 0,
    startTime: "",
    endTime: "",
  });
  const debouncedStudentId = useDebounce(studentInfo.studentId, 500);
  const [payment, setPayment] = useState({
    id: 0,
    amountToPay: 0,
    agreedTerms: false,
  });
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (!debouncedStudentId) return;

    const fetchTuition = async () => {
      try {
        const data = await tuitionService.getStudentTuition(
          debouncedStudentId,
          "PENDING"
        );

        if (Array.isArray(data)) {
          const currentTuition = findCurrentTuition(data);
          if (currentTuition) {
            setStudentInfo({
              studentId: currentTuition.sID,
              studentName: currentTuition.student.name,
              tuitionAmount: currentTuition.fee,
              startTime: currentTuition.startTime,
              endTime: currentTuition.endTime,
            });
            setPayment((prev) => ({
              ...prev,
              amountToPay: currentTuition.fee,
              id: currentTuition.id,
            }));
          }
        }
      } catch (err) {
        console.error("Failed to fetch tuition:", err);
      }
    };

    fetchTuition();
  }, [debouncedStudentId]);

  const handleSendOtp = async () => {
    const res = await otpService.genearateOtp(user.id.toString(), payer.email);
    if (res) {
      toast.success(`Send OTP to email ${payer.email}`);
    } else {
      toast.error("Error occured when sending OTP");
    }
  };

  const handleConfirmOtp = async () => {
    const res = await otpService.verifyOtp(user.id.toString(), otp);
    if (res) {
      const res = await studentService.payTuition(
        studentInfo.studentId,
        payment.id,
        user.id,
        user.sID ? "STUDENT" : "OTHER"
      );
      if (res) {
        if (user.sID) {
          const studentResponse = await studentService.getStudent(user.id);
          setUser(studentResponse);
        } else {
          const authResponse = await authService.getUser(user.id);
          setUser(authResponse);
        }
        toast.success("Thanh toán thành công!");
        setStep(3);
      } else {
        toast.error("Có lỗi xảy ra");
      }
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchUser = async () => {
      const res = user.sID
        ? await studentService.getStudent(user.id)
        : await authService.getUser(user.id);

      if (res) {
        setPayer({
          fullName: res.name ?? "",
          phone: res.phone || res.phoneNumber || "",
          email: res.email || "",
          balance: res.balance,
        });
      }
    };

    fetchUser();
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">Thanh toán học phí</h1>

      {/* Thanh trạng thái */}
      <div className="flex items-center justify-center space-x-2">
        {STEPS.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = step === stepNumber;
          const isCompleted = step > stepNumber;

          return (
            <div key={label} className="flex items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold
                  ${
                    isActive
                      ? "bg-[#00713D] text-white"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
              >
                {stepNumber}
              </div>
              <span className="ml-2 text-sm font-medium">{label}</span>
              {index < STEPS.length - 1 && (
                <div className="w-10 h-[2px] bg-gray-300 mr-2 ml-4" />
              )}
            </div>
          );
        })}
      </div>

      {/* Nội dung theo step */}
      {step === 1 && (
        <CheckInformation
          payer={payer}
          studentInfo={studentInfo}
          payment={payment}
          setStudentInfo={setStudentInfo}
          setPayment={setPayment}
          onNext={() => setStep(2)}
          onSendOtp={handleSendOtp}
        />
      )}

      {step === 2 && (
        <InputOtp otp={otp} setOtp={setOtp} onConfirm={handleConfirmOtp} />
      )}

      {step === 3 && <DisplayResult history={[]} />}
    </div>
  );
}
