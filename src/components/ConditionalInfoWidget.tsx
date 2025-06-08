"use client";
import { usePathname } from 'next/navigation';
import InfoSupportWidget from '@/components/InfoSupportWidget';

export default function ConditionalInfoWidget() {
  const pathname = usePathname();
  
  // 메인페이지, Education, Enterprise 페이지에서는 렌더링하지 않음
  if (pathname === '/' || pathname === '/education' || pathname.startsWith('/enterprise')) {
    return null;
  }
  
  return <InfoSupportWidget />;
} 