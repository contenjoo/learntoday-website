'use client';

import React, { useState, useEffect } from 'react';

interface MizouPriceCalculatorProps {
  initialStudentCount?: number;
  onStudentCountChange?: (count: number) => void;
  onAddToCart: (price: number) => void;
}

export default function MizouPriceCalculator({
  initialStudentCount = 300,
  onStudentCountChange,
  onAddToCart
}: MizouPriceCalculatorProps) {
  // 학생 수 상태
  const [studentCount, setStudentCount] = useState<number>(initialStudentCount);
  // 계산된 가격 상태
  const [price, setPrice] = useState<number>(0);
  // 학교 유형 상태
  const [schoolType, setSchoolType] = useState<string>('');

  // 학생 수에 따른 가격 계산 함수
  const calculatePrice = (students: number): number => {
    const count = Math.max(1, Math.floor(students));

    if (count >= 1 && count <= 299) {
      return 1500000; // 학교 A: 1~299명
    } else if (count >= 300 && count <= 3000) {
      return 3000000; // 학교 B: 300~3,000명
    } else if (count >= 3001 && count <= 6000) {
      return 5000000; // 학교 C: 3,001~6,000명
    } else if (count >= 6001 && count <= 10000) {
      return 9000000; // 학교 D: 6,001~10,000명
    } else if (count > 10000) {
      return 9000000; // 10,000명 초과 시 최대 가격 적용
    } else {
      return 0; // 유효하지 않은 학생 수
    }
  };

  // 학생 수에 따른 학교 유형 결정 함수
  const determineSchoolType = (students: number): string => {
    const count = Math.max(1, Math.floor(students));

    if (count >= 1 && count <= 299) {
      return '학교 A';
    } else if (count >= 300 && count <= 3000) {
      return '학교 B';
    } else if (count >= 3001 && count <= 6000) {
      return '학교 C';
    } else if (count >= 6001 && count <= 10000) {
      return '학교 D';
    } else {
      return '별도 문의';
    }
  };

  // 초기 가격 계산
  useEffect(() => {
    const newPrice = calculatePrice(initialStudentCount);
    const newSchoolType = determineSchoolType(initialStudentCount);

    setPrice(newPrice);
    setSchoolType(newSchoolType);
  }, [initialStudentCount]);

  // 학생 수 변경 시 가격 및 학교 유형 업데이트
  useEffect(() => {
    const newPrice = calculatePrice(studentCount);
    const newSchoolType = determineSchoolType(studentCount);

    setPrice(newPrice);
    setSchoolType(newSchoolType);

    // 부모 컴포넌트에 학생 수 변경 알림
    if (onStudentCountChange) {
      onStudentCountChange(studentCount);
    }

    console.log(`학생 수: ${studentCount}명, 가격: ${newPrice.toLocaleString()}원, 유형: ${newSchoolType}`);
  }, [studentCount, onStudentCountChange]);

  // 학생 수 증가 핸들러
  const handleIncrement = () => {
    setStudentCount(prev => prev + 1);
  };

  // 학생 수 감소 핸들러
  const handleDecrement = () => {
    setStudentCount(prev => Math.max(1, prev - 1));
  };

  // 학생 수 직접 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setStudentCount(Math.max(1, value));
    }
  };

  // 장바구니에 추가 핸들러
  const handleAddToCart = () => {
    onAddToCart(price);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">Mizou 학교 플랜</h2>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">학생 수:</span>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={handleDecrement}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max="10000"
              value={studentCount}
              onChange={handleInputChange}
              className="w-20 text-center border-none focus:outline-none"
            />
            <button
              onClick={handleIncrement}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        <div className="font-semibold text-blue-700 text-lg">
          계산된 견적 가격: {price.toLocaleString()}원
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {schoolType} ({studentCount.toLocaleString()}명)
        </p>
      </div>

      <div className="text-xs text-gray-500 mb-4">
        <p>학교 A: 1~299명 - 1,500,000원/년</p>
        <p>학교 B: 300~3,000명 - 3,000,000원/년</p>
        <p>학교 C: 3,001~6,000명 - 5,000,000원/년</p>
        <p>학교 D: 6,001~10,000명 - 9,000,000원/년</p>
        <p>학교 D+: 10,000명 초과 - 9,000,000원/년</p>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path d="M6 6h15l-1.68 8.39A2 2 0 0 1 17.36 16H8.64a2 2 0 0 1-1.96-1.61L4 4H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <circle cx="9" cy="21" r="1" fill="currentColor"></circle>
          <circle cx="19" cy="21" r="1" fill="currentColor"></circle>
        </svg>
        장바구니에 추가
      </button>
    </div>
  );
}
