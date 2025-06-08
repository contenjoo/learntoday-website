"use client";
import { useState, useEffect } from 'react';

export default function HeaderTimeDisplay() {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      
      // 시간 포맷팅 (HH:MM:SS)
      const timeString = now.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      // 날짜 포맷팅 (YYYY년 MM월 DD일 요일)
      const dateString = now.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });
      
      // 인사말 설정
      const hours = now.getHours();
      let greetingText = '';
      
      if (hours >= 5 && hours < 12) {
        greetingText = '좋은 아침입니다';
      } else if (hours >= 12 && hours < 18) {
        greetingText = '좋은 오후입니다';
      } else if (hours >= 18 && hours < 22) {
        greetingText = '좋은 저녁입니다';
      } else {
        greetingText = '좋은 밤입니다';
      }
      
      setTime(timeString);
      setDate(dateString);
      setGreeting(greetingText);
    };
    
    // 초기 시간 설정
    updateTime();
    
    // 1초마다 업데이트
    const timeInterval = setInterval(updateTime, 1000);
    
    return () => {
      clearInterval(timeInterval);
    };
  }, []);
  
  // 서버 사이드 렌더링 중에는 아무것도 렌더링하지 않음
  if (!mounted) return null;
  
  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center mb-1">
        <div className="text-sm font-medium text-blue-600 mr-2">{greeting}</div>
        <div className="text-lg font-bold text-blue-700">{time}</div>
      </div>
      <div className="text-xs text-gray-500">{date}</div>
    </div>
  );
}
