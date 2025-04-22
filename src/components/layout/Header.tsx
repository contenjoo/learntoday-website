"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    // 현재 로그인된 사용자 정보 가져오기
    const getUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // 인증 상태 변경 리스너 설정
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      // 컴포넌트 언마운트 시 리스너 제거
      authListener.subscription.unsubscribe();
    };
  }, []);

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
                width={120}
                height={40}
                priority
                quality={100}
                style={{ objectFit: 'contain', height: 'auto' }}
                className="w-auto max-h-10"
              />
            </Link>
          </div>

          {/* 네비게이션 메뉴 (데스크톱) */}
          <nav className="hidden md:flex items-center space-x-4 ml-4">
            <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium">
              제품 소개
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
              문의하기
            </Link>
            <div className="flex items-center space-x-2">
              <a
                href="https://t2c.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full font-medium border border-yellow-300 hover:bg-yellow-200 transition-colors text-sm"
              >
                T2C
              </a>
              <a
                href="https://joo.is"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full font-medium border border-purple-300 hover:bg-purple-200 transition-colors text-sm"
              >
                주이즈
              </a>
            </div>
          </nav>

          {/* 오른쪽 영역: 전화번호와 로그인/프로필 */}
          <div className="hidden md:flex items-center ml-auto">
            {/* 전화번호 */}
            <div className="flex flex-col items-end mr-6">
              <span className="text-xs text-gray-500 font-medium">문의전화</span>
              <span className="text-2xl font-bold text-blue-700 tracking-wide select-all">
                0507-1316-1571
              </span>
            </div>

            {/* 로그인 상태에 따라 다른 UI 표시 */}
            {loading ? (
              <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-full"></div>
            ) : user ? (
              <div className="relative">
                <button 
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-800 max-w-[120px] truncate">
                    {user.email?.split('@')[0]}
                  </span>
                  <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 프로필 드롭다운 메뉴 */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                    </div>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      내 프로필
                    </Link>
                    <button
                      onClick={async () => {
                        await supabase.auth.signOut();
                        router.push('/');
                        router.refresh();
                        setProfileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                로그인/회원가입
              </Link>
            )}
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
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden fixed top-[65px] left-0 w-full z-50`}>
        <div className="px-2 pt-2 pb-3 space-y-2 border-t border-gray-200 bg-white shadow-lg">
          <Link href="/products" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md">
            제품 소개
          </Link>
          <Link href="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md">
            문의하기
          </Link>
          <div className="flex items-center space-x-2 px-3 py-2">
            <a
              href="https://t2c.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 text-sm font-medium text-yellow-800 bg-yellow-100 hover:bg-yellow-200 rounded-md border border-yellow-300"
            >
              T2C
            </a>
            <a
              href="https://joo.is"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 text-sm font-medium text-purple-800 bg-purple-100 hover:bg-purple-200 rounded-md border border-purple-300"
            >
              주이즈
            </a>
          </div>

          {/* 모바일 전화번호 - 오른쪽 정렬 */}
          <div className="px-3 py-2 flex flex-col items-end">
            <span className="text-xs text-gray-500">문의전화</span>
            <a href="tel:0507-1316-1571" className="text-xl font-bold text-blue-700">0507-1316-1571</a>
          </div>

          {/* 모바일 로그인/프로필 영역 */}
          <div className="px-3 py-2">
            {loading ? (
              <div className="w-full h-12 bg-gray-200 animate-pulse rounded-lg"></div>
            ) : user ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-2 bg-gray-100 rounded-lg">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 truncate">
                    <p className="font-medium text-gray-900 truncate">{user.email?.split('@')[0]}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
                <Link href="/profile" className="block w-full text-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium">
                  내 프로필
                </Link>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    router.push('/');
                    router.refresh();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-center px-4 py-2 border border-red-300 rounded-lg text-red-600 bg-white hover:bg-red-50 font-medium"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link href="/login" className="w-full text-center block px-4 py-3 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-medium shadow-sm">
                로그인/회원가입
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
