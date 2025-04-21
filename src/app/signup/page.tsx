"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    schoolName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    // 입력값 검증
    if (!formData.email || !formData.password || !formData.phoneNumber || !formData.schoolName) {
      setError("모든 필드를 입력해주세요.");
      setLoading(false);
      return;
    }
    
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("올바른 이메일 형식이 아닙니다.");
      setLoading(false);
      return;
    }
    
    // 전화번호 형식 검증 (숫자, -, 공백만 허용)
    const phoneRegex = /^[0-9\-\s]+$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError("전화번호는 숫자, - 만 입력 가능합니다.");
      setLoading(false);
      return;
    }
    
    try {
      // 1. Supabase Auth로 사용자 계정 생성
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            phone_number: formData.phoneNumber,
            school_name: formData.schoolName,
          }
        }
      });
      
      if (authError) throw authError;
      
      // 성공 처리
      setSuccess(true);
      // 5초 후 홈페이지로 이동
      setTimeout(() => {
        router.push('/');
      }, 5000);
    } catch (err: any) {
      console.error('회원가입 오류:', err);
      setError(err.message || '회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
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
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">이메일</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">비밀번호</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호 (6자 이상)"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="mb-2 block text-sm font-medium text-gray-700">전화번호</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="010-0000-0000"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="schoolName" className="mb-2 block text-sm font-medium text-gray-700">소속 (학교/기관명)</label>
          <input
            id="schoolName"
            name="schoolName"
            type="text"
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            value={formData.schoolName}
            onChange={handleChange}
            placeholder="소속 학교 또는 기관명"
          />
        </div>
        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
        {success && (
          <div className="mb-4 p-3 rounded-md text-sm text-green-600 bg-green-50 border border-green-200">
            회원가입이 완료되었습니다! 이메일을 확인해주세요.<br/>
            잠시 후 홈페이지로 이동합니다.
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
