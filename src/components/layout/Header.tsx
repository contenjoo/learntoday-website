"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      {/* 상단 컬러 바 */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* 로고 영역 */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/learntoday.png"
                alt="오늘배움 로고"
                width={80}
                height={80}
                priority
                className="h-16 w-auto"
              />
            </Link>
          </div>
          
          {/* 네비게이션 메뉴 (데스크톱) */}
          <nav className="hidden md:flex items-center space-x-6 ml-4">
            <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium">
              제품 소개
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
              문의하기
            </Link>
            <a 
              href="https://t2c.kr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-medium border border-yellow-300 hover:bg-yellow-200 transition-colors"
            >
              T2C
            </a>
          </nav>

          {/* 오른쪽 영역: 전화번호와 로그인 */}
          <div className="hidden md:flex items-center ml-auto">
            {/* 전화번호 */}
            <div className="flex flex-col items-end mr-6">
              <span className="text-xs text-gray-500 font-medium">문의전화</span>
              <span className="text-2xl font-bold text-blue-700 tracking-wide select-all">
                0507-1316-1571
              </span>
            </div>
            
            {/* 통합 로그인/회원가입 버튼 */}
            <Link 
              href="/login" 
              className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              로그인/회원가입
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            >
              <span className="sr-only">메뉴 열기</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 오버레이 */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent md:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-label="메뉴 닫기 오버레이"
        ></div>
      )}
      {/* 모바일 메뉴 */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden fixed top-0 left-0 w-full z-50`}>
        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 bg-white">
          <Link href="/products" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md">
            제품 소개
          </Link>
          <Link href="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md">
            문의하기
          </Link>
          <a 
            href="https://t2c.kr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block px-3 py-2 text-base font-medium text-yellow-800 bg-yellow-100 hover:bg-yellow-200 rounded-md border border-yellow-300"
          >
            T2C
          </a>
          
          {/* 모바일 전화번호 - 오른쪽 정렬 */}
          <div className="px-3 py-2 flex flex-col items-end">
            <span className="text-xs text-gray-500">문의전화</span>
            <a href="tel:0507-1316-1571" className="text-xl font-bold text-blue-700">0507-1316-1571</a>
          </div>
          
          {/* 통합 로그인/회원가입 버튼 */}
          <div className="px-3 py-2">
            <Link href="/login" className="w-full text-center block px-4 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700">
              로그인/회원가입
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
