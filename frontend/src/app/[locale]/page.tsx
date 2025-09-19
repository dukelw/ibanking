/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user, setUser, setTokens } = useAuthStore();
  console.log(user);
  const router = useRouter();

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    setTokens(null);
    router.push("/signin");
  };

  const handleGotoTuition = () => {
    if (!user) {
      alert("Vui lòng đăng nhập trước khi đóng học phí");
      router.push("/signin");
      return;
    }
    router.push("/tuition");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full flex justify-end items-center p-4 bg-gray-100 shadow">
        {user ? (
          <div className="flex items-center gap-4">
            <span>{user.email}</span>
            {/* <Image
              src={user.avatar}
              width={40}
              height={40}
              alt="User"
              className="rounded-full"
            /> */}
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button>
              <Link href="/signin">Signin</Link>
            </Button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-6">
        <h1 className="text-2xl font-bold">
          Chào mừng đến với cổng thông tin học phí sinh viên
        </h1>
        {user ? (
          <Button onClick={handleGotoTuition}>Vào trang đóng học phí</Button>
        ) : (
          <p className="text-red-500">
            Vui lòng đăng nhập trước khi đóng học phí
          </p>
        )}
      </main>
    </div>
  );
}
