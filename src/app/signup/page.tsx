"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="mb-6 text-2xl font-bold text-gray-900">회원가입</h2>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">이메일</label>
          <input
            type="email"
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">비밀번호</label>
          <input
            type="password"
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
        </div>
        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
        {success && (
          <div className="mb-4 text-sm text-green-600">
            회원가입이 완료되었습니다! 이메일을 확인해주세요.
          </div>
        )}
        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "가입 중..." : "회원가입"}
        </button>
      </form>
    </div>
  );
}
