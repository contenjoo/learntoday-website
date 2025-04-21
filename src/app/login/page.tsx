"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      setLoading(false);
      return;
    }
    
    try {
      console.log('로그인 시도:', { email });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      console.log('로그인 응답:', { data, error: error ? { message: error.message } : null });
      
      if (error) throw error;
      
      console.log('로그인 성공:', data.user);
      
      // 로그인 성공 시 홈페이지로 이동
      router.push('/');
      router.refresh(); // 상태 새로고침
    } catch (err: any) {
      console.error('로그인 오류:', err);
      setError(err.message || '로그인 중 오류가 발생했습니다. 이메일과 비밀번호를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">로그인</h2>
        
        {error && (
          <div className="mb-4 p-3 rounded-md text-sm text-red-600 bg-red-50 border border-red-200">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">이메일</label>
            <input
              id="email"
              type="email"
              required
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">비밀번호</label>
            <input
              id="password"
              type="password"
              required
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            계정이 없으신가요?{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-800">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
