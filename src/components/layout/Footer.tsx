"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NewsletterForm from '@/components/NewsletterForm';
import { useDemoContext } from '@/context/DemoContext';

function YearCopyright() {
  const [year, setYear] = useState<string | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);
  return (
    <p className="text-center text-sm text-gray-500">
      &copy; {year ?? ''} 주식회사 오늘배움. All rights reserved.
    </p>
  );
}

export default function Footer() {
  const { openDemoScheduler } = useDemoContext();
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Google-style footer with sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 pb-8">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">주식회사 오늘배움</h3>
            <p className="text-sm text-gray-600 mb-2">교육 기관을 위한 AI 및 디지털 기술 기반 솔루션</p>
            <p className="text-sm text-gray-600">혁신적인 교육 환경을 만들어갑니다</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">제품</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  제품 소개
                </Link>
              </li>
              <li>
                <button
                  onClick={openDemoScheduler}
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0 text-left"
                >
                  1:1 데모 신청하기
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">회사 정보</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">사업자등록번호: 313-86-02193</li>
              <li className="text-sm text-gray-600">대표: 주방현</li>
              <li className="text-sm text-gray-600">주소(본사):<br className="sm:hidden" /> 대전광역시 유성구 지족로351 402호</li>
              <li className="text-sm text-gray-600">주소(이노베이션센터):<br className="sm:hidden" /> 대전광역시 서구 만년로68번길 15-20 6층 613호</li>
              <li className="text-sm text-gray-600">전화: 0507-1316-1571</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">계정</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  로그인
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  회원가입
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="border-t border-gray-100 py-6">
          <YearCopyright />
        </div>
      </div>
    </footer>
  );
}
