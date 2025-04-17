"use client";
import Link from 'next/link';

import { useEffect, useState } from 'react';

function YearCopyright() {
  const [year, setYear] = useState<string | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);
  return (
    <p className="mt-8 text-center text-base text-gray-400">
      &copy; {year ?? ''} 주식회사 오늘배움. All rights reserved.
    </p>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 rounded-t-2xl shadow-inner mt-10">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-8 lg:px-12 flex flex-col items-center">
        <nav className="-mx-2 -my-1 flex flex-wrap justify-center gap-2" aria-label="Footer">
          <div className="px-5 py-2">
            <Link href="/" className="text-base text-gray-600 hover:text-blue-700 px-3 py-2 rounded-lg transition hover:bg-blue-50 font-medium">
              홈
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/products" className="text-base text-gray-600 hover:text-blue-700 px-3 py-2 rounded-lg transition hover:bg-blue-50 font-medium">
              제품 소개
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/contact" className="text-base text-gray-600 hover:text-blue-700 px-3 py-2 rounded-lg transition hover:bg-blue-50 font-medium">
              문의하기
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/login" className="text-base text-gray-600 hover:text-blue-700 px-3 py-2 rounded-lg transition hover:bg-blue-50 font-medium">
              로그인
            </Link>
          </div>
        </nav>
        <div className="mt-8 flex justify-center gap-4">
          {/* Social media links can be added here */}
        </div>
        <YearCopyright />
        <div className="mt-4 text-center text-sm text-gray-400">
            <hr className="my-3 border-gray-200" />
          <p>사업자등록번호: 000-00-00000 | 대표: 홍길동</p>
          <p>주소: 서울특별시 강남구 테헤란로 123 | 전화: 02-123-4567</p>
        </div>
      </div>
    </footer>
  );
}
