'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DemoScheduler from '@/components/DemoScheduler';

export default function HubSpotPage() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  const openDemoScheduler = () => {
    setIsSchedulerOpen(true);
  };

  const closeDemoScheduler = () => {
    setIsSchedulerOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-geist-sans)]">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                뒤로 가기
              </button>
              <span className="text-gray-300">|</span>
              <Link href="/enterprise" className="text-sm text-gray-600 hover:text-gray-900">
                비즈니스 솔루션으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                  <Image
                    src="/images/hubspot.jpg"
                    alt="HubSpot"
                    width={40}
                    height={40}
                    className="rounded"
                  />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">HubSpot</h1>
                  <p className="text-orange-600 font-medium">종합 CRM 플랫폼의 혁신</p>
                </div>
              </div>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                2006년 브라이언 홀리건과 다린 디쉬가 설립한 종합 CRM 플랫폼으로, 인바운드 마케팅 개념을 기반으로 마케팅, 영업, 고객 서비스 기능을 통합했습니다. 
                전 세계 150개국 이상에서 194,000개 이상의 기업이 활용하며 디지털 전환을 주도하고 있습니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={openDemoScheduler}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  무료 상담받기
                </button>
                <a
                  href="https://www.hubspot.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 border-orange-500 text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors text-center"
                >
                  HubSpot 방문하기
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">194,000+</div>
                    <div className="text-gray-600">활용 기업</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">150+</div>
                    <div className="text-gray-600">지원 국가</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">60%</div>
                    <div className="text-gray-600">리드 응대시간 단축</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">23%</div>
                    <div className="text-gray-600">전환율 향상</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">핵심 기능과 아키텍처</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              HubSpot의 강력한 통합 플랫폼으로 마케팅, 영업, 고객 서비스를 하나로 연결하세요.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-orange-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">통합 CRM 시스템</h3>
              <p className="text-gray-600">360도 고객 데이터 집적, AI 기반 리드 스코어링, 사용자 정의 파이프라인</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">마케팅 허브</h3>
              <p className="text-gray-600">옴니채널 캠페인 관리, AI 예측 리드 스코어링, 29개 언어 AI 번역</p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">영업 허브</h3>
              <p className="text-gray-600">영업 프로세스 자동화, 회의 녹화 및 자동 요약, 개인화된 메일 최적화</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">서비스 허브</h3>
              <p className="text-gray-600">티켓 라우팅 시스템, AI 채팅봇 28개 언어 지원, NPS/CSAT 분석</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">제품별 기술적 심화 분석</h2>
            <p className="text-xl text-gray-600">AI와 머신러닝을 활용한 차세대 비즈니스 솔루션</p>
          </div>

          <div className="space-y-4">
            {[
              {
                id: 'marketing',
                title: '마케팅 허브의 고급 기능',
                features: [
                  'Adaptive Testing: AI가 웹사이트 A/B 테스트를 자동화하여 최적화된 버전을 실시간 배포, 전환율 23% 향상',
                  '멀티터치 매출 기여도 분석: 7가지 모델로 마케팅 채널별 ROI 평가 및 예산 배분 전략 수립',
                  '동영상 호스팅 및 분석: YouTube 연동으로 시청자 행동 데이터를 CRM 통합, 클릭 핫스팟 식별'
                ]
              },
              {
                id: 'sales',
                title: '영업 허브의 AI 혁신',
                features: [
                  '대화 지능: 영업 통화 녹음의 텍스트 변환, 감정 분석 및 키워드 추출로 신입 교육용 베스트 프랙티스 자동 생성',
                  '예측 거래 성공률: 과거 영업 데이터 학습으로 현재 파이프라인의 거래 성사 확률을 89% 정확도로 예측'
                ]
              },
              {
                id: 'service',
                title: '서비스 허브의 자동화 엔진',
                features: [
                  '티켓 분류 엔진: NLP로 고객 문의 의도 인식 후 적절한 담당자 배정, 평균 응답 시간 40% 단축',
                  '프로액티브 알림: 제품 사용 패턴 분석으로 잠재적 문제 사전 탐지 및 해결책 제안'
                ]
              }
            ].map((section) => (
              <div key={section.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion(section.id)}
                  className="w-full px-6 py-4 text-left bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openAccordion === section.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {openAccordion === section.id && (
                  <div className="px-6 py-4">
                    <ul className="space-y-3">
                      {section.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">가격 정책과 확장성</h2>
            <p className="text-xl text-gray-600">모듈형 가격 체계로 기업의 성장 단계에 맞춘 유연한 확장</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">무료 플랜</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">$0</div>
                <div className="text-gray-600">평생 무료</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  <span>기본 CRM 기능</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  <span>연락처 1,000,000개</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  <span>이메일 마케팅</span>
                </li>
              </ul>
              <button
                onClick={openDemoScheduler}
                className="w-full py-3 border-2 border-orange-500 text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors"
              >
                무료로 시작하기
              </button>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl p-6 relative">
              <div className="absolute top-4 right-4 bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-bold">
                인기
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">스타터 플랜</h3>
                <div className="text-3xl font-bold mb-1">$20</div>
                <div className="opacity-90">월/사용자당</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-white rounded-full mr-3"></span>
                  <span>고급 CRM 기능</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-white rounded-full mr-3"></span>
                  <span>마케팅 자동화</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-white rounded-full mr-3"></span>
                  <span>리드 스코어링</span>
                </li>
              </ul>
              <button
                onClick={openDemoScheduler}
                className="w-full py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                상담받기
              </button>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">프로페셔널 플랜</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">$100+</div>
                <div className="text-gray-600">월/사용자당</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  <span>AI 예측 분석</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  <span>고급 워크플로우</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  <span>커스텀 리포팅</span>
                </li>
              </ul>
              <button
                onClick={openDemoScheduler}
                className="w-full py-3 border-2 border-orange-500 text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors"
              >
                상담받기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 HubSpot으로 비즈니스를 혁신하세요
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            194,000개 이상의 기업이 선택한 검증된 CRM 플랫폼으로 디지털 전환을 시작하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openDemoScheduler}
              className="px-8 py-4 bg-white text-orange-600 font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-colors"
            >
              무료 상담 예약하기
            </button>
            <a
              href="https://www.hubspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-orange-600 transition-colors"
            >
              HubSpot 무료 체험
            </a>
          </div>
        </div>
      </section>
      
      <DemoScheduler isOpen={isSchedulerOpen} onClose={closeDemoScheduler} />
    </div>
  );
} 