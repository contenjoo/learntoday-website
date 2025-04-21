"use client";
import { useState, useEffect } from 'react';

interface DemoSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoScheduler({ isOpen, onClose }: DemoSchedulerProps) {
  const [mounted, setMounted] = useState(false);
  
  // 모바일 환경에서 iframe 크기 조정을 위한 상태
  const [iframeSize, setIframeSize] = useState({
    width: '100%',
    height: '700px'
  });
  
  // 컴포넌트가 마운트되면 mounted 상태를 true로 설정
  useEffect(() => {
    setMounted(true);
    
    // 화면 크기에 따라 iframe 크기 조정
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIframeSize({
          width: '100%',
          height: '600px'
        });
      } else {
        setIframeSize({
          width: '100%',
          height: '700px'
        });
      }
    };
    
    // 초기 크기 설정 및 리사이즈 이벤트 리스너 등록
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // 서버 사이드 렌더링 중에는 아무것도 렌더링하지 않음
  if (!mounted) return null;
  
  // 팝업이 닫혀있으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent overflow-y-auto"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-xl max-h-[90vh] flex flex-col py-4 px-2 overflow-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">1:1 데모 일정 예약</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-auto">
          <iframe
            src="https://zcal.co/i/zTG-ZdX8?embed=1&embedType=iframe"
            loading="lazy"
            style={{
              border: 'none',
              width: '100%',
              height: typeof window !== 'undefined' && window.innerWidth < 768 ? '60vh' : '70vh',
              minWidth: '320px',
              minHeight: '400px',
              display: 'block'
            }}
            id="zcal-invite"
            scrolling="auto"
            title="1:1 데모 예약"
          />
        </div>
      </div>
    </div>
  );
}
