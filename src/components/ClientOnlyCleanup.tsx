"use client";
import { useEffect } from 'react';

export default function ClientOnlyCleanup() {
  useEffect(() => {
    // 브라우저 확장 프로그램 속성 제거 함수
    function cleanupBrowserExtensions() {
      try {
        // bis 관련 속성 제거 (일반적인 브라우저 확장 프로그램)
        const elementsWithBis = document.querySelectorAll('[bis_skin_checked], [bis_size], [bis_id], [bis_use]');
        elementsWithBis.forEach(el => {
          el.removeAttribute('bis_skin_checked');
          el.removeAttribute('bis_size');
          el.removeAttribute('bis_id');
          el.removeAttribute('bis_use');
          el.removeAttribute('data-bis-config');
        });

        // Next.js 로딩 관련 요소 제거
        const nextjsLoaders = document.querySelectorAll(`
          [data-next-mark-loading],
          [data-next-mark-loading="true"], 
          [data-next-mark-loading="false"],
          svg[width="40"][height="40"],
          svg[viewBox="0 0 40 40"]
        `);
        nextjsLoaders.forEach(el => {
          el.remove();
        });

        // 외부 스크립트 제거 (확장 프로그램)
        const externalScripts = document.querySelectorAll('script[src*="chrome-extension"], script[src*="moz-extension"]');
        externalScripts.forEach(script => {
          script.remove();
        });
      } catch (error) {
        // 에러 무시 - 확장 프로그램 충돌 방지
      }
    }

    // 초기 실행
    cleanupBrowserExtensions();

    // MutationObserver로 동적 변경 감지
    const observer = new MutationObserver(() => {
      cleanupBrowserExtensions();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['bis_skin_checked', 'bis_size', 'bis_id', 'data-next-mark-loading']
    });

    // 주기적 정리 (백업)
    const intervalId = setInterval(cleanupBrowserExtensions, 1000);

    // 클린업
    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, []);

  return null; // 렌더링하지 않음
} 