"use client";
import { useEffect } from 'react';

export default function PinchatWidget() {
  useEffect(() => {
    // 이미 스크립트가 로드되었는지 확인
    if (document.querySelector('script[src*="pinchat.app/pinchat.js"]')) {
      return;
    }

    // Pinchat 스크립트 생성 및 추가
    const script = document.createElement('script');
    script.src = 'https://pinchat.app/pinchat.js?token=today';
    script.defer = true;
    script.async = true;
    
    // 스크립트를 body 끝에 추가
    document.body.appendChild(script);
    
    // 컴포넌트가 언마운트될 때 스크립트 제거 (필요한 경우)
    return () => {
      // 일반적으로 채팅 위젯은 제거하지 않지만, 필요하다면 아래 코드 활성화
      // const scriptElement = document.querySelector('script[src*="pinchat.app/pinchat.js"]');
      // if (scriptElement) {
      //   document.body.removeChild(scriptElement);
      // }
    };
  }, []);

  // 이 컴포넌트는 실제로 아무것도 렌더링하지 않음
  return null;
}
