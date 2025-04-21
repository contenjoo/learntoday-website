"use client";
import { useState, useEffect } from 'react';

const ClockWidget = () => {
  const [time, setTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setTime(timeString);
    };
    
    // 초기 시간 설정
    updateTime();
    
    // 1초마다 업데이트
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="fixed top-20 left-4 z-50 bg-white/90 dark:bg-gray-800/90 shadow-md rounded-md px-3 py-2 text-sm font-medium border border-gray-200 dark:border-gray-700">
      {time}
    </div>
  );
};

export default ClockWidget;
