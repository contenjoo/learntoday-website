"use client";
import { useState, useEffect } from 'react';

export default function HeaderTimeDisplay() {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('윤빛');
  const [mounted, setMounted] = useState(false);
  
  // 명언 목록 가져오기
  const fetchQuotes = async () => {
    try {
      const quotes = [
        '돈은 마실수록 목마른 바닷물이다.',
        '지식은 힘이다, 그러나 실천이 없는 지식은 무용지물이다.',
        '배움에는 끝이 없다, 그것이 인생의 아름다움이다.',
        '오늘 할 수 있는 일을 내일로 미루지 마라.',
        '실패는 성공의 어머니이다.',
        '인생은 선택의 연속이다.',
        '시간은 가장 공평한 자원이다.',
        '꿈을 향해 한 걸음씩 나아가라.',
        '겸손은 지혜의 시작이다.',
        '행복은 나눌수록 커진다.'
      ];
      
      // 랜덤 명언 선택
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    } catch (error) {
      console.error('명언을 가져오는 중 오류 발생:', error);
      setQuote('배움에는 끝이 없다.');
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchQuotes();
    
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
    
    // 30초마다 명언 업데이트
    const quoteInterval = setInterval(fetchQuotes, 30000);
    
    return () => {
      clearInterval(timeInterval);
      clearInterval(quoteInterval);
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
      <div className="mt-1 text-xs text-gray-600 italic flex items-center">
        <span className="text-blue-400 mr-1">"</span>
        <span>{quote}</span>
        <span className="text-blue-400 ml-1">"</span>
      </div>
    </div>
  );
}
