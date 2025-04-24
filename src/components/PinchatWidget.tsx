"use client";
import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function PinchatWidget() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // 서버 사이드 렌더링 중에는 null을 반환
  if (typeof window === 'undefined') {
    return null;
  }
  
  return (
    <>
      {mounted && (
        <Script
          src="https://pinchat.app/pinchat.js?token=today"
          strategy="afterInteractive"
          id="pinchat-script"
        />
      )}
      <div id="pinchat-container"></div>
    </>
  );
}
