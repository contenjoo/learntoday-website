"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TimeDisplay() {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('윤빛');
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

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
  
  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-all touch-manipulation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      </button>
    );
  }
  
  return (
    <div className="fixed top-20 right-4 z-50 w-72 sm:w-80 bg-white shadow-lg rounded-md overflow-hidden border border-gray-200">
      <div className="flex justify-between items-center p-2 border-b border-gray-100 bg-blue-50">
        <div className="text-base font-medium text-blue-600 text-center flex-grow">{greeting}</div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="p-4 sm:p-5 text-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-5xl sm:text-6xl md:text-7xl font-bold mb-2 sm:mb-3 text-blue-600">{time}</div>
        <div className="text-sm sm:text-base text-blue-500 mb-3 sm:mb-4">{date}</div>
      </div>
      
      <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50 text-center">
        <div className="flex items-center justify-center">
          <div className="text-sm sm:text-base text-blue-400 mr-1">"</div>
          <div className="text-sm sm:text-base text-gray-700 leading-relaxed">{quote}</div>
          <div className="text-sm sm:text-base text-blue-400 ml-1">"</div>
        </div>
        <div className="text-center text-xs sm:text-sm text-blue-500 mt-1 sm:mt-2 font-medium">{author}</div>
      </div>
    </div>
  );
}
