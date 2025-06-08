"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { getCartCount } from '@/utils/cart';
import dynamic from 'next/dynamic';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showComingSoonPopup, setShowComingSoonPopup] = useState(false);
  const { cart } = useCart();
  const cartCount = getCartCount(cart.items);
  const CartDrawer = dynamic(() => import('@/components/cart/CartDrawer'), { ssr: false });

  // Education 페이지에서만 장바구니 표시
  const isEducationPage = pathname === '/education' || pathname?.startsWith('/education/') || pathname?.startsWith('/products');

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      {/* 상단 컬러 바 */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 영역 */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/learntoday-logo-small.png"
                alt="오늘배움 로고"
                width={172}
                height={40}
                priority
                quality={100}
                className="h-8 w-auto sm:h-10 md:h-12"
                style={{ objectFit: 'contain' }}
              />
            </Link>
          </div>
          
          {/* 중앙 네비게이션 메뉴 (데스크톱) */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <Link 
                href="/education" 
                className={`text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-md transition-colors ${
                  pathname === '/education' ? 'text-blue-600 bg-blue-50' : ''
                }`}
              >
                교육
              </Link>
              
              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowComingSoonPopup(!showComingSoonPopup);
                  }}
                  className={`text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-md transition-colors ${
                    pathname === '/enterprise' ? 'text-blue-600 bg-blue-50' : ''
                  }`}
                >
                  비즈니스
                </button>
                
                {/* 비즈니스 드롭다운 팝업 */}
                {showComingSoonPopup && (
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64 z-50">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🚀</div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">곧 찾아옵니다!</h3>
                      <p className="text-xs text-gray-600">
                        오늘배움 비즈니스 솔루션을 준비 중입니다.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 블로그 링크 */}
              <Link 
                href="https://blog.learntoday.co.kr" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-md transition-colors"
              >
                블로그
              </Link>
            </div>
          </nav>
          
          {/* 오른쪽 영역: 전화번호와 장바구니 */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <div className="flex items-center space-x-6">
              {/* 전화번호 */}
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500 font-medium">문의전화</span>
                <span className="text-lg font-bold text-blue-700 tracking-wide select-all">0507-1316-1571</span>
              </div>
              
              {/* 장바구니 버튼 - Education 페이지에서만 표시 */}
              {isEducationPage && (
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors relative"
                  aria-label="장바구니 열기"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19" />
                  </svg>
                  <span>장바구니</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
          
          {/* 모바일 메뉴 버튼과 장바구니 */}
          <div className="md:hidden flex items-center space-x-3">
            {/* 모바일 장바구니 버튼 - Education 페이지에서만 표시 */}
            {isEducationPage && (
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 relative"
                aria-label="장바구니 열기"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            
            {/* 모바일 메뉴 버튼 */}
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
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden fixed top-[65px] left-0 w-full z-50`}>
        <div className="px-4 pt-4 pb-4 space-y-2 border-t border-gray-200 bg-white shadow-lg">
          <Link 
            href="/education" 
            className={`block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors ${
              pathname === '/education' ? 'bg-blue-50 text-blue-600' : ''
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            교육
          </Link>
          
          <div className="relative">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowComingSoonPopup(!showComingSoonPopup);
              }}
              className={`block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md w-full text-left transition-colors ${
                pathname === '/enterprise' ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              비즈니스
            </button>
            
            {/* 모바일 비즈니스 팝업 */}
            {showComingSoonPopup && (
              <div className="mt-2 bg-blue-50 rounded-lg border border-blue-200 p-3">
                <div className="flex items-center space-x-3">
                  <div className="text-lg">🚀</div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">곧 찾아옵니다!</h3>
                    <p className="text-xs text-gray-600">
                      비즈니스 솔루션을 준비 중입니다.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* 모바일 블로그 링크 */}
          <Link 
            href="https://blog.learntoday.co.kr" 
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            블로그
          </Link>
          
          {/* 모바일 전화번호 */}
          <div className="px-4 py-3 border-t border-gray-100 mt-2 pt-4">
            <div className="flex flex-col items-center text-center">
              <span className="text-xs text-gray-500 font-medium mb-1">문의전화</span>
              <a 
                href="tel:0507-1316-1571" 
                className="text-lg font-bold text-blue-700 tracking-wide hover:text-blue-800 transition-colors"
              >
                0507-1316-1571
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* 전체 배경 클릭시 팝업 닫기 */}
      {showComingSoonPopup && (
        <div 
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setShowComingSoonPopup(false)}
        />
      )}
      
      {/* 장바구니 드로어 - Education 페이지에서만 표시 */}
      {isEducationPage && <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />}
    </header>
  );
}
