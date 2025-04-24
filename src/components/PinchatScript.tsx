"use client";

import { useEffect, useState } from "react";

export default function PinchatScript() {
  // 클라이언트 사이드 렌더링을 보장하기 위한 상태
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트되었음을 표시
    setMounted(true);
    
    // 이미 존재하는 스크립트 확인
    const existingScript = document.querySelector('script[src*="pinchat.app/pinchat.js"]');
    
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://pinchat.app/pinchat.js?token=today";
      script.defer = true;
      document.head.appendChild(script);
    }
    
    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거 (필요한 경우)
      // const script = document.querySelector('script[src*="pinchat.app/pinchat.js"]');
      // if (script) document.head.removeChild(script);
    };
  }, []);

  // 서버 사이드 렌더링 중에는 아무것도 렌더링하지 않음
  if (!mounted) return null;

  // 클라이언트 사이드에서만 렌더링
  return null;
}
