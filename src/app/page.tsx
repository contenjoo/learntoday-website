"use client";
import Image from "next/image";
import Link from "next/link";
import { useDemoContext } from "@/context/DemoContext";
import { useEffect, useState } from "react";

export default function Home() {
  const { openDemoScheduler } = useDemoContext();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 서버 사이드 렌더링 시 기본값 사용
  if (!mounted) {
    return (
      <div className="font-[family-name:var(--font-geist-sans)]">
        <div className="landing-container">
          {/* Custom Header for Landing Page */}
          <header className="landing-header absolute top-0 left-0 right-0 z-50 py-6 px-6 md:px-12">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/learntoday-logo-small.png"
                  alt="오늘배움 로고"
                  width={172}
                  height={40}
                  priority
                  quality={100}
                  className="h-12 w-auto"
                />
              </Link>
              <div className="header-right flex items-center gap-6">
                <Link 
                  href="https://blog.learntoday.co.kr" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white cursor-pointer hover:text-blue-200"
                >
                  블로그
                </Link>
              </div>
            </div>
          </header>
          
          {/* Loading state */}
          <main className="portal-container flex-row" style={{ minHeight: '100vh' }}>
            <div className="w-full h-screen bg-gradient-to-br from-blue-600/85 via-blue-700/80 to-green-500/75 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>로딩 중...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="landing-container">
        {/* Custom Header for Landing Page */}
        <header className="landing-header absolute top-0 left-0 right-0 z-50 py-6 px-6 md:px-12">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/learntoday-logo-small.png"
                alt="오늘배움 로고"
                width={172}
                height={40}
                priority
                quality={100}
                className="h-12 w-auto"
              />
            </Link>
                          <div className="header-right flex items-center gap-6">
                <Link 
                  href="https://blog.learntoday.co.kr" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white cursor-pointer hover:text-blue-200"
                >
                  블로그
                </Link>
              </div>
          </div>
        </header>
        
        {/* Main Portal Container */}
        <main className={`portal-container ${isMobile ? 'flex-col' : 'flex-row'}`} style={{ minHeight: '100vh' }}>
          {/* Education Portal (Left side) */}
          <section className={`portal education-portal flex-1 flex flex-col justify-center items-center p-6 md:p-12 text-white relative ${isMobile ? 'order-2' : ''}`}>
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url("/images/classroom.jpg")',
              }}
            ></div>
            
            {/* Enhanced Overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/85 via-blue-700/80 to-green-500/75"></div>
            
            <div className="portal-content max-w-xl mx-auto text-center md:text-left relative z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-shadow-lg">
                학습의 미래를 만드는<br />
                <span className="text-green-200">AI 교육 솔루션</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-medium mb-6 text-blue-100">K-12 및 대학 교육을 위한 맞춤형 에듀테크</h2>
              <ul className="value-points text-left mb-8 space-y-4">
                <li className="flex items-start bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <svg className="h-6 w-6 mr-3 flex-shrink-0 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">학생 중심 AI 학습 경험</span>
                </li>
                <li className="flex items-start bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <svg className="h-6 w-6 mr-3 flex-shrink-0 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">교사를 위한 교육 관리 도구</span>
                </li>
                <li className="flex items-start bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <svg className="h-6 w-6 mr-3 flex-shrink-0 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">학습 데이터 기반 개인화 교육</span>
                </li>
              </ul>
              <Link href="/education" className="cta-button education-cta inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-blue-50 text-lg">
                교육 솔루션 살펴보기
              </Link>
            </div>
          </section>
          
          {/* Enterprise Portal (Right side) */}
          <section className={`portal enterprise-portal flex-1 flex flex-col justify-center items-center p-6 md:p-12 text-white relative ${isMobile ? 'order-1' : ''}`}>
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url("/images/image.png")',
              }}
            ></div>
            
            {/* Enhanced Overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-700/85 to-blue-800/80"></div>
            
            <div className="portal-content max-w-xl mx-auto text-center md:text-left relative z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-shadow-lg">
                기업 성장의 파트너<br />
                <span className="text-blue-300">오늘배움 엔터프라이즈</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-medium mb-6 text-slate-200">기업 맞춤형 AI 교육 & 업무 혁신 솔루션</h2>
              <ul className="value-points text-left mb-8 space-y-4">
                <li className="flex items-start bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <svg className="h-6 w-6 mr-3 flex-shrink-0 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">데이터 기반 인재 역량 개발</span>
                </li>
                <li className="flex items-start bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <svg className="h-6 w-6 mr-3 flex-shrink-0 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">맞춤형 기업 교육 자동화</span>
                </li>
                <li className="flex items-start bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <svg className="h-6 w-6 mr-3 flex-shrink-0 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">교육 ROI 측정 및 분석</span>
                </li>
              </ul>
              <div className="cta-button enterprise-cta inline-block px-8 py-4 bg-gray-400 text-gray-700 font-bold rounded-full shadow-lg cursor-not-allowed text-lg opacity-60">
                Coming Soon
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
