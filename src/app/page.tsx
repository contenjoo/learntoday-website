"use client";
import Image from "next/image";
import Link from "next/link";
import { useDemoContext } from "@/context/DemoContext";

export default function Home() {
  const { openDemoScheduler } = useDemoContext();
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section - Google Style */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-normal text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block font-light">가르치는 사람이</span>
                <span className="block text-blue-600 font-normal">세상을 바꾼다</span>
              </h1>
              <p className="mt-4 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 leading-relaxed">
                주식회사 오늘배움은 교사와 교육자가 혁신을 이끌 수 있도록 AI 기반 교육 솔루션을 제공합니다. 교사의 가치를 높이고 교육의 미래를 함께 만들어갑니다.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                  <Link
                    href="/products"
                    className="w-full flex items-center justify-center px-6 py-3 text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                  >
                    제품 살펴보기
                  </Link>
                  <button
                    onClick={openDemoScheduler}
                    className="w-full flex items-center justify-center px-6 py-3 text-base font-medium rounded-full text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 shadow-sm"
                  >
                    1:1 데모 신청하기
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-xl overflow-hidden shadow-sm">
                <div className="w-full h-80 relative">
                  <Image
                    src="/images/main.jpeg"
                    alt="학생들이 교실에서 공부하는 모습"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Google Material Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-blue-600 font-medium mb-2">우리의 믿음</h2>
            <p className="text-3xl font-normal text-gray-900">
              선생님의 역량을 돕는 혁신 솔루션
            </p>
            <p className="mt-4 max-w-2xl text-lg text-gray-600 mx-auto whitespace-nowrap">오늘배움은 교사의 시간과 역량을 존중하며, 교육자들이 본연의 역할에 집중할 수 있도록 지원합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 - Card Style */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">맞춤형 학습</h3>
              <p className="text-gray-600">
                AI 기술을 활용한 개인 맞춤형 학습 경험을 제공하여 학생들의 학습 효율성을 극대화합니다.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">교사 중심 설계</h3>
              <p className="text-gray-600">
                교사의 필요와 교육 현장의 요구에 맞춰 개발된 직관적인 AI 도구를 제공합니다.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">효율적인 관리</h3>
              <p className="text-gray-600">
                학교 행정 및 교육 과정 관리를 자동화하여 교사와 행정 직원의 업무 효율성을 높입니다.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">소통 강화</h3>
              <p className="text-gray-600">
                교사, 학생, 학부모 간의 소통을 원활하게 하는 다양한 도구를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Google Style */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-normal text-gray-900 mb-4">
            <span className="block">교육의 힘을 함께 키워갑니다</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            오늘배움과 함께 학생들의 미래를 위한 혁신적인 교육 환경을 조성해보세요.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={openDemoScheduler}
              className="px-6 py-3 rounded-full text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              1:1 데모 신청하기
            </button>
            <Link
              href="/products"
              className="px-6 py-3 rounded-full text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 shadow-sm"
            >
              제품 더 알아보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
