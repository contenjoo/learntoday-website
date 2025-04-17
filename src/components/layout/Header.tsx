"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg rounded-b-2xl border-b border-gray-100">
      <div className="absolute left-0 top-0 w-full h-2 bg-gradient-to-r from-blue-500 to-green-400 rounded-t-2xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="h-9 w-auto font-extrabold text-2xl tracking-tight text-blue-700 select-none rounded px-2 py-1 bg-blue-50 shadow-sm">오늘배움</span>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link 
                href="/products" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                제품 소개
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                문의하기
              </Link>
            </nav>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center gap-2">
            <Link 
              href="/login" 
              className="inline-flex items-center px-5 py-2 rounded-lg text-base font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 shadow-md transition"
              id="login-button"
            >
              로그인
            </Link>
            <Link 
              href="/signup" 
              className="inline-flex items-center px-5 py-2 rounded-lg text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition"
              id="signup-button"
            >
              회원가입
            </Link>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg rounded-b-2xl`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/products"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
          >
            제품 소개
          </Link>
          <Link
            href="/contact"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
          >
            문의하기
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <Link
                href="/login"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
