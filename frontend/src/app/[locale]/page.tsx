"use client";

import { useAuthStore } from "@/store/authStore";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { School } from "lucide-react";
import Header from "@/layout/Header";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TuitionHomePage() {
  const { user } = useAuthStore();
  const router = useRouter();

  const handleGotoTuition = () => {
    router.push("/tuition");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-6">
        {user ? (
          <>
            {/* Bước 1: Hiện chữ */}
            <motion.h2
              className="text-2xl font-bold text-[#00713D]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Xin chào <span className="text-green-400">{user.email}</span>, vào
              ngay trang đóng học phí
            </motion.h2>

            {/* Bước 2: Hiện hình */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Image
                src="/school.png"
                alt="School"
                width={400}
                height={200}
                className="mx-auto"
              />
            </motion.div>

            {/* Bước 3: Hiện nút */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Button
                color={"green"}
                onClick={handleGotoTuition}
                className="flex items-center gap-2 cursor-pointer"
              >
                <School className="w-4 h-4" />
                Vào trang đóng học phí
              </Button>
            </motion.div>
          </>
        ) : (
          <>
            <motion.h2
              className="text-3xl font-bold text-[#00713D] uppercase"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Chào mừng đến với web đóng học phí
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Image
                src="/school.png"
                alt="School"
                width={400}
                height={200}
                className="mx-auto"
              />
            </motion.div>
            <motion.p
              className="text-[#00713D] font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Vui lòng
              <Link
                className="mx-1 text-blue-500 font-semibold"
                href="/signin-student"
              >
                đăng nhập sinh viên
              </Link>
              hoặc
              <Link className="mx-1 text-pink-500 font-semibold" href="/signin-other">
                đăng nhập khác
              </Link>
              để tiếp tục
            </motion.p>
          </>
        )}
      </main>
    </div>
  );
}
