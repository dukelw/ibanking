"use client";

import { useState } from "react";
import { useTranslations } from "use-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Label, TextInput, Button, Spinner } from "flowbite-react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

export default function SignIn() {
  const t = useTranslations("auth");
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { setUser } = useAuthStore();

  const isEmailValid = /^\S+@\S+\.\S+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const canSubmit = isEmailValid && isPasswordValid && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      const response = await authService.signIn(email, password);
      setUser(response.user);
      router.push("/");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || t("serverError"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">{t("signIn")}</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Email */}
          <div>
            <Label htmlFor="email" />
            <TextInput
              id="email"
              type="email"
              placeholder="you@example.com"
              icon={EnvelopeIcon}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color={!email ? undefined : isEmailValid ? "success" : "failure"}
              required
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" />
            <div className="relative">
              <TextInput
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                icon={LockClosedIcon}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                color={
                  !password
                    ? undefined
                    : isPasswordValid
                    ? "success"
                    : "failure"
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                aria-label={showPass ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPass ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            color="green"
            type="submit"
            disabled={!canSubmit}
            className="w-full"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <Spinner size="sm" /> {t("signingIn")}
              </span>
            ) : (
              t("signIn")
            )}
          </Button>
        </form>
        {/* Extra Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 text-sm">
          <Link href="/" className="text-blue-600 hover:underline">
            Về trang chủ
          </Link>
          <Link
            href="/signin-student"
            className="text-blue-600 hover:underline"
          >
            Đăng nhập sinh viên
          </Link>
        </div>
      </Card>
    </main>
  );
}
