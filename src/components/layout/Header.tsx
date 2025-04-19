"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md border-b border-gray-100">
      {/* Google-style colored top bar */}
      <div className="absolute left-0 top-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-32 relative"> {/* Increased height */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/images/learntoday.png"
                alt="오늘배움 로고"
                width={96}
                height={96}
                priority
                className="mr-4"
              />
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link 
                href="/products" 
                className="inline-flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-full transition-colors duration-200"
              >
                제품 소개
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-full transition-colors duration-200"
              >
                문의하기
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex md:items-center gap-2">
              <Link 
                href="/login" 
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                id="login-button"
              >
                로그인
              </Link>
              <Link 
                href="/signup" 
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                id="signup-button"
              >
                회원가입
              </Link>
            </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">메뉴 열기</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Google style dropdown */}
      <div 
        className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg absolute w-full transition-all duration-200 ease-in-out`}
        style={{ maxHeight: isMenuOpen ? '300px' : '0' }}
      >
        <div className="pt-2 pb-3 space-y-1 px-4">
          <Link
            href="/products"
            className="block px-3 py-2 rounded-full text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
          >
            제품 소개
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 rounded-full text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
          >
            문의하기
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 px-4">
          <div className="flex flex-col space-y-2">
            <Link
              href="/login"
              className="block w-full text-center px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="block w-full text-center px-4 py-2 rounded-full text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
