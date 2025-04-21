"use client";
import { useState, useEffect } from 'react';

const TimePopup = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록 마운트 상태 설정
    setMounted(true);
    setCurrentTime(new Date());
    
    // 1초마다 시간 업데이트
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, []);
  
  // 서버 사이드 렌더링 중에는 아무것도 렌더링하지 않음
  if (!mounted || !currentTime) return null;
  
  // 시간 포맷팅 (HH:MM:SS)
  const formattedTime = currentTime.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  
  return (
    <div className="fixed left-4 top-20 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 z-50 
                    border border-gray-200 dark:border-gray-700 transition-opacity duration-500 opacity-80 hover:opacity-100">
      <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
        {formattedTime}
      </div>
    </div>
  );
};

export default TimePopup;
