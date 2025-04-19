"use client";
import { createContext, useState, useContext, ReactNode } from 'react';
import DemoScheduler from '@/components/DemoScheduler';

interface DemoContextType {
  openDemoScheduler: () => void;
  closeDemoScheduler: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDemoScheduler = () => {
    setIsOpen(true);
    // 팝업이 열릴 때 스크롤 방지
    document.body.style.overflow = 'hidden';
  };

  const closeDemoScheduler = () => {
    setIsOpen(false);
    // 팝업이 닫힐 때 스크롤 복원
    document.body.style.overflow = 'auto';
  };

  return (
    <DemoContext.Provider value={{ openDemoScheduler, closeDemoScheduler }}>
      {children}
      <DemoScheduler isOpen={isOpen} onClose={closeDemoScheduler} />
    </DemoContext.Provider>
  );
}

export function useDemoContext() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemoContext must be used within a DemoProvider');
  }
  return context;
}
