"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // 3초 후 자동으로 메인페이지로 리디렉션
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg text-center">
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h2 className="mb-4 text-2xl font-bold text-gray-900">서비스 일시 중단</h2>
        
        <p className="mb-6 text-gray-600">
          로그인 서비스가 일시적으로 중단되었습니다.<br />
          3초 후 자동으로 메인페이지로 이동합니다.
        </p>
        
        <Link
          href="/"
          className="inline-block rounded bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          메인페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}
