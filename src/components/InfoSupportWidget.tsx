"use client";
import React, { useState, useEffect } from 'react';

export default function InfoSupportWidget() {
  // 상태 관리
  const [isOpen, setIsOpen] = useState(true); 
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('윤빛');
  const [mounted, setMounted] = useState(false);
  
  // 위젯 토글 함수 
  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };
  
  // 시간 업데이트 함수
  const updateTime = () => {
    const now = new Date();
    
    // 시간 포맷팅 (HH:MM:SS) - 12시간제
    const timeString = now.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
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

  // 명언 목록 가져오기
  const fetchQuotes = async () => {
    try {
      // modern-wisdom.md 파일에서 가져온 명언들
      const quotes = [
        { text: '불확실함은 새로운 기회의 씨앗이다.', author: '윤빛' },
        { text: '검색은 지식, 침묵은 지혜를 준다.', author: '윤빛' },
        { text: '경쟁보다 창조에 집중하라.', author: '윤빛' },
        { text: '실패는 배움의 또 다른 이름이다.', author: '윤빛' },
        { text: '완벽보다 완료가 중요하다.', author: '윤빛' },
        { text: '내면의 평화가 최고의 능력이다.', author: '윤빛' },
        { text: '말보다 행동이 더 크게 말한다.', author: '윤빛' },
        { text: '디지털 속에서도 인간성을 지켜라.', author: '윤빛' },
        { text: '과거 집착은 미래로 가는 발목이다.', author: '윤빛' },
        { text: '시작이 반이 아니라 전부다.', author: '윤빛' },
        { text: '자신을 최고의 투자처로 여겨라.', author: '윤빛' },
        { text: '세상 변화는 자기 변화에서 시작된다.', author: '윤빛' },
        { text: '오늘의 선택이 내일을 만든다.', author: '윤빛' },
        { text: '실행 없는 계획은 꿈일 뿐이다.', author: '윤빛' },
        { text: '단순한 해결책이 가장 강력하다.', author: '윤빛' }
      ];
      
      // 랜덤 명언 선택
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex].text);
      setAuthor('윤빛'); // 모든 명언의 저자를 윤빛으로 설정
    } catch (error) {
      console.error('명언을 가져오는 중 오류 발생:', error);
      setQuote('배움에는 끝이 없다.');
      setAuthor('윤빛');
    }
  };

  // 초기 마운트 시 실행
  useEffect(() => {
    setMounted(true);
    updateTime();
    fetchQuotes();
    
    // 1초마다 시간 업데이트
    const intervalId = setInterval(updateTime, 1000);
    
    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(intervalId);
  }, []); 

  // 위젯 렌더링
  if (!isOpen) {
    // 닫혀 있을 때 표시할 버튼 (왼쪽 중앙)
    return (
      <button
        onClick={toggleWidget}
        className="fixed top-1/2 left-4 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        aria-label="정보 및 지원 센터 열기"
      >
        {/* 아이콘 (예: 정보 아이콘) */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    );
  }

  return (
    // 열려 있을 때 위젯 컨텐츠 (왼쪽 중앙)
    <div suppressHydrationWarning className="info-support-widget fixed top-1/2 left-4 transform -translate-y-1/2 w-72 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
      {/* 헤더: 닫기 버튼 */}
      <div suppressHydrationWarning className="flex justify-end p-2">
        <button
          onClick={toggleWidget}
          className="text-gray-400 hover:text-gray-600"
          aria-label="정보 및 지원 센터 닫기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* 시간 및 명언 섹션 */}
      <div suppressHydrationWarning className="p-4 pt-0"> 
        {/* 시간, 날짜, 인사말 표시 - 마운트된 후에만 표시 */}
        {mounted ? (
          <div suppressHydrationWarning className="mb-4 text-center">
            <p className="text-lg font-semibold text-gray-800">
              {greeting}
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {time}
            </p>
            <p className="text-sm text-gray-600">
              {date}
            </p>
          </div>
        ) : (
          // 마운트 전 로딩 상태 표시 (옵션)
          <div className="h-20"></div> 
        )}
        
        {/* 명언 표시 - 마운트된 후에만 표시 */}
        {mounted ? (
          <div suppressHydrationWarning className="mt-4 pt-4 border-t border-gray-200 text-center">
            <p className="text-sm italic text-gray-700">"{quote}"</p>
            <p className="text-xs text-gray-500 mt-1">- {author}</p>
          </div>
        ) : (
          // 마운트 전 로딩 상태 표시 (옵션)
          <div className="h-10"></div> 
        )}
      </div>
    </div>
  );
}
