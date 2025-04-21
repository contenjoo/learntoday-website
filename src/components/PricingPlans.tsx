"use client";
import { useState } from 'react';
import { useDemoContext } from '@/context/DemoContext';

export default function PricingPlans() {
  const [isAnnual, setIsAnnual] = useState(true);
  const { openDemoScheduler } = useDemoContext();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Redmenta 요금제
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">
            교육자를 위한 AI 기반 솔루션, 필요에 맞는 요금제를 선택하세요.
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="relative bg-gray-100 p-1 rounded-full inline-flex">
              <button
                onClick={() => setIsAnnual(true)}
                className={`${
                  isAnnual
                    ? 'bg-white shadow-sm'
                    : 'bg-transparent text-gray-500'
                } relative w-32 rounded-full py-2 text-sm font-medium transition-all focus:outline-none`}
              >
                연간 결제
                {isAnnual && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                    20% 할인
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsAnnual(false)}
                className={`${
                  !isAnnual
                    ? 'bg-white shadow-sm'
                    : 'bg-transparent text-gray-500'
                } relative w-32 rounded-full py-2 text-sm font-medium transition-all focus:outline-none`}
              >
                월간 결제
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:space-y-0">
          {/* AI 플랜 */}
          <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">AI 플랜</h3>
              <p className="mt-4 flex items-baseline text-gray-900">
                <span className="text-4xl font-extrabold tracking-tight">
                  {isAnnual ? '₩190,000' : '₩19,900'}
                </span>
                <span className="ml-1 text-xl font-semibold">
                  {isAnnual ? '/년' : '/월'}
                </span>
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {isAnnual ? '연간 결제 (20% 할인 적용)' : '월 단위 결제'}
              </p>
              <p className="mt-6 text-gray-500">
                교육자를 위한 기본 AI 기능을 제공합니다.
              </p>

              <ul className="mt-6 space-y-3">
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500">라이센스당 1명의 교육자 사용자</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500">10 GB 저장 공간 (약 1500 워크시트)</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500">AI 지원 및 수동 워크시트 생성</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500">무제한 AI 어시스턴트 제공</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500">콘텐츠 및 활동 제작</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500">평가</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500">적응형 교육 자료</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500">편집자 협업</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500">클라우드에 테스트 보관</span>
                </li>
              </ul>
            </div>

            <button
              onClick={openDemoScheduler}
              className="mt-8 block w-full bg-blue-600 border border-transparent rounded-md py-3 px-6 text-center font-medium text-white hover:bg-blue-700"
            >
              무료 데모 신청하기
            </button>
          </div>

          {/* AI 프로 플랜 */}
          <div className="relative p-8 bg-white border border-blue-500 rounded-2xl shadow-sm flex flex-col">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-blue-100 text-blue-600">
                추천
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">AI 프로 플랜</h3>
              <p className="mt-4 flex items-baseline text-gray-900">
                <span className="text-4xl font-extrabold tracking-tight">
                  {isAnnual ? '₩290,000' : '₩29,900'}
                </span>
                <span className="ml-1 text-xl font-semibold">
                  {isAnnual ? '/년' : '/월'}
                </span>
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {isAnnual ? '연간 결제 (20% 할인 적용)' : '월 단위 결제'}
              </p>
              <p className="mt-6 text-gray-500">
                전문 교육자를 위한 고급 기능과 더 많은 저장 공간을 제공합니다.
              </p>

              <ul className="mt-6 space-y-3">
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500">라이센스당 1명의 교육자 사용자</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500"><strong className="text-gray-900">50 GB</strong> 저장 공간 (약 7500 워크시트)</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500">AI 지원 및 수동 워크시트 생성</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500">무제한 AI 어시스턴트 제공</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500">콘텐츠 및 활동 제작</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500">평가</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500">적응형 교육 자료</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500">편집자 협업</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 text-gray-500">클라우드에 테스트 보관</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3 font-medium text-gray-900">우선 고객 지원</span>
                </li>
              </ul>
            </div>

            <button
              onClick={openDemoScheduler}
              className="mt-8 block w-full bg-blue-600 border border-transparent rounded-md py-3 px-6 text-center font-medium text-white hover:bg-blue-700"
            >
              무료 데모 신청하기
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            대량 구매 및 교육기관 할인에 대해 알아보시려면{' '}
            <button
              onClick={openDemoScheduler}
              className="text-blue-600 font-medium hover:text-blue-500"
            >
              문의하세요
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
