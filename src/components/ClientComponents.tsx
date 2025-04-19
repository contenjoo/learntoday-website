"use client";
import dynamic from "next/dynamic";

// TimeDisplay 컴포넌트를 클라이언트 사이드에서만 로드하도록 설정
export const DynamicTimeDisplay = dynamic(() => import("@/components/TimeDisplay"), {
  ssr: false
});
