"use client";

import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  LogIn,
  LogOut,
  School,
  BookOpen,
  History,
  CreditCard,
  UserCircle,
} from "lucide-react";

export default function Header() {
  const { user, setUser, setTokens } = useAuthStore();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    setTokens(null);
    router.push("/signin-student");
  };

  // click ngoài thì đóng menu
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full flex justify-between items-center bg-[#00713D] text-white p-4 shadow-md relative">
      <Link href={"/"}>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <School className="w-6 h-6" />
          IBanking
        </h1>
      </Link>

      {/* Dropdown chung cho cả logged in & logged out */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpenMenu((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-1 bg-[#055a2b] rounded hover:bg-[#044d24] transition"
        >
          {user ? user.email : <UserCircle className="w-5 h-5" />}
        </button>

        {openMenu && (
          <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded shadow-lg overflow-hidden z-50">
            {user ? (
              <>
                <Link
                  href="/tuition/lookup"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpenMenu(false)}
                >
                  <BookOpen className="w-4 h-4" />
                  Tra cứu học phí
                </Link>
                <Link
                  href="/tuition/history"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpenMenu(false)}
                >
                  <History className="w-4 h-4" />
                  Lịch sử đóng học phí
                </Link>
                <Link
                  href="/tuition"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpenMenu(false)}
                >
                  <CreditCard className="w-4 h-4" />
                  Vào trang đóng học phí
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin-student"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpenMenu(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Đăng nhập sinh viên
                </Link>
                <Link
                  href="/signin-other"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpenMenu(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Đăng nhập khác
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
