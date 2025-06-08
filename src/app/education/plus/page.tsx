"use client";
import Image from "next/image";
import Link from "next/link";
import { useDemoContext } from "@/context/DemoContext";

export default function EducationPlusPage() {
  const { openDemoScheduler } = useDemoContext();
  
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-normal text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block font-light">오늘배움</span>
              <span className="block text-blue-600 font-normal">플러스</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              세계 최고의 에듀테크를 한 번에 체험하는 혁신적인 플랫폼
            </p>
            <div className="mt-8">
              <span className="inline-flex items-center px-6 py-3 rounded-full text-lg font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                ⭐ 오늘배움 회원 전용 서비스
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-normal text-gray-900 mb-4">
              🎯 서비스 개요
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>오늘배움 플러스</strong>는 전 세계 우수 에듀테크 기업들과 파트너십을 맺어, 
                학교가 프리미엄 교육 도구들을 부담 없이 체험하고 선택할 수 있도록 돕는 큐레이션 플랫폼입니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                단순한 도구 제공이 아닌, <strong>학교별 맞춤 매칭</strong>과 <strong>전문 교육 지원</strong>을 통해 
                진정한 교육 혁신을 이끌어냅니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Member Exclusive Service */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-normal text-gray-900 mb-4">
                👑 회원 전용 특별 서비스
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>오늘배움 플러스</strong>는 <strong>오늘배움 회원들에게만 특별히 제공</strong>되는 프리미엄 서비스입니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>무료 회원가입</strong>을 통해 이 혁신적인 에듀테크 체험 플랫폼에 참여하실 수 있으며, 
                회원만의 특별한 혜택과 우선 접근권을 제공받게 됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-normal text-gray-900 mb-4">
              🤝 파트너 에듀테크 솔루션
            </h2>
          </div>
          <div className="max-w-5xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              오늘배움이 엄선한 글로벌 에듀테크 파트너들은 교육 현장의 다양한 니즈를 충족시킵니다. 
              직관적인 학습 관리와 체계적인 평가 시스템을 제공하는 올인원 솔루션을 통해 교사들이 손쉽게 
              학생들의 학습 진도를 추적하고 효율적인 교실 운영을 할 수 있습니다.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              AI 기반 맞춤형 콘텐츠 생성 도구는 교육과정에 완벽히 맞춘 학습 자료를 자동으로 생성하고, 
              학생 개별 수준을 분석하여 최적화된 퀴즈와 교육 콘텐츠를 제공합니다.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              또한 풍부한 멀티미디어 라이브러리와 실시간 협업 기능을 결합한 종합 교육 플랫폼을 통해 
              교사와 학생, 학생과 학생 간의 소통을 원활하게 하여 참여형 수업을 구현할 수 있습니다.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              게임화된 인터랙티브 평가 시스템은 실시간 피드백과 즉각적인 반응을 통해 평가를 재미있는 경험으로 바꿔주며, 
              학생들의 적극적인 참여를 이끌어냅니다.
            </p>
          </div>
        </div>
      </section>

      {/* Application Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-normal text-gray-900 mb-4">
              📋 신청 자격 및 조건
            </h2>
          </div>
          
          {/* 기간 한정 신청 안내 */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-2xl">⏰</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-orange-800 mb-2">
                  ⚠️ 기간 한정 신청 서비스
                </h3>
                <p className="text-orange-700 leading-relaxed">
                  <strong>오늘배움 플러스는 상시 신청이 아닙니다.</strong> 파트너 에듀테크 기업들과의 협의를 통해 
                  <strong className="text-red-600">특정 기간에만 신청을 받고 있습니다.</strong> 
                  신청 기간과 조건은 추후 별도로 안내드릴 예정이니, 관심 있으신 학교는 미리 
                  <strong>오늘배움 회원가입</strong>을 해두시기 바랍니다.
                </p>
                <div className="mt-4 flex items-center text-sm text-orange-600">
                  <span className="mr-2">📧</span>
                  신청 기간 오픈 시 회원님께 우선 안내해드립니다
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* 신청 자격 */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-6">신청 자격</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold text-lg mr-3">•</span>
                  <div>
                    <strong>오늘배움 회원</strong>: 무료 회원가입 필수
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold text-lg mr-3">•</span>
                  <div>
                    <strong>대규모 학교 (교사 15명 이상)</strong>: 교사 15명 이상의 서면 동의 필요
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold text-lg mr-3">•</span>
                  <div>
                    <strong>소규모 학교 (교사 10명 이하)</strong>: 전체 교사의 서면 동의 필요
                  </div>
                </li>
              </ul>
            </div>

            {/* 비용 구조 */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-6">비용 구조</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-600 font-bold text-lg mr-3">✓</span>
                  <div>
                    <strong>회원가입</strong>: 완전 무료
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold text-lg mr-3">✓</span>
                  <div>
                    <strong>체험 기간</strong>: 완전 무료
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold text-lg mr-3">✓</span>
                  <div>
                    <strong>도입 결정</strong>: 체험 후 학교 자체 판단으로 선택적 구매
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold text-lg mr-3">✓</span>
                  <div>
                    <strong>강제 구매 없음</strong>: 체험만으로도 충분한 가치 제공
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* 체험 기간 상세 안내 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg border border-blue-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                📅 체험 기간 상세 안내
              </h3>
              <div className="bg-white rounded-lg p-4 shadow-sm inline-block">
                <span className="text-3xl font-bold text-blue-600">2개월 +α</span>
                <p className="text-sm text-gray-600 mt-1">(최대 6개월까지 연장 가능)</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">기본 체험기간</h4>
                <p className="text-gray-600 text-sm">최소 2개월 보장</p>
                <div className="mt-2 text-xs text-blue-600">파트너별 상이</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">사용량 기반 연장</h4>
                <p className="text-gray-600 text-sm">활발한 사용 시 추가 기간</p>
                <div className="mt-2 text-xs text-green-600">최대 6개월</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">저사용량 제한</h4>
                <p className="text-gray-600 text-sm">사용량 적으면 연장 어려움</p>
                <div className="mt-2 text-xs text-orange-600">적극 활용 필요</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">순차적 체험</h4>
                <p className="text-gray-600 text-sm">여러 도구 단계별 체험</p>
                <div className="mt-2 text-xs text-purple-600">비교 검토 가능</div>
              </div>
            </div>

            {/* 실제 사용 시나리오 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-xl mr-2">💡</span>
                실제 체험 시나리오
              </h4>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong className="text-yellow-800">"30일 무료체험은 혼자 사용하기엔 충분합니다."</strong><br/>
                  하지만 학교 현장에서는 <span className="font-medium text-red-600">선생님들 가입시키고 설명하다 보면 보름은 이미 지나있더라고요.</span> 
                  그래서 오늘배움 플러스는 <strong>기본 2개월</strong>을 제공하며, 
                  <span className="font-medium text-blue-600">실제 수업에서 활발히 활용하시면 최대 6개월까지 연장</span>해드립니다.
                </p>
              </div>
              
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-medium text-green-800 mb-2">✅ 연장 가능한 경우</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 교사들이 정기적으로 도구 활용</li>
                    <li>• 학생들의 참여도가 높음</li>
                    <li>• 수업에서 실질적 효과 확인</li>
                    <li>• 피드백을 통한 개선 의지 표명</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h5 className="font-medium text-red-800 mb-2">❌ 연장 어려운 경우</h5>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• 가입만 하고 실제 사용 안함</li>
                    <li>• 월 1-2회 접속 등 저조한 활용</li>
                    <li>• 교사 연수 참여율 저조</li>
                    <li>• 피드백이나 문의사항 없음</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Education Support */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-normal text-gray-900 mb-4">
              🎓 전문 교육 지원 서비스
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* AI 챗봇 기반 자율 학습 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8">
              <h3 className="text-xl font-medium text-gray-900 mb-6">AI 챗봇 기반 자율 학습</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold text-lg mr-3">🤖</span>
                  <div>
                    <strong>24시간 학습 지원</strong>: 오늘배움이 제공하는 AI 챗봇을 통해 언제든지 에듀테크 도구 사용법 학습
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold text-lg mr-3">💬</span>
                  <div>
                    <strong>실시간 질문 응답</strong>: 궁금한 점을 즉시 해결할 수 있는 지능형 챗봇 서비스
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold text-lg mr-3">📚</span>
                  <div>
                    <strong>단계별 가이드</strong>: 초보자부터 고급 사용자까지 수준별 맞춤 학습 경로 제공
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold text-lg mr-3">🎯</span>
                  <div>
                    <strong>자율적 학습</strong>: 선생님들이 스스로 익힐 수 있는 자기주도 학습 환경
                  </div>
                </li>
              </ul>
            </div>

            {/* 필요시 온라인 연수 제공 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8">
              <h3 className="text-xl font-medium text-gray-900 mb-6">필요시 온라인 연수 제공</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-600 font-bold text-lg mr-3">🎓</span>
                  <div>
                    <strong>선택적 연수</strong>: 필요에 따라 30분 온라인 교사 연수 제공
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold text-lg mr-3">🎯</span>
                  <div>
                    <strong>맞춤형 교육</strong>: 학교별 특성을 반영한 실습 중심 교육
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold text-lg mr-3">🔄</span>
                  <div>
                    <strong>유연한 지원</strong>: 학교의 요청과 상황에 맞춘 탄력적 교육 서비스
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-normal text-gray-900 mb-4">
              🔄 서비스 이용 프로세스
            </h2>
          </div>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex items-start bg-white rounded-lg p-6 shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                1
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">회원가입 및 상담</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• 오늘배움 무료 회원가입</li>
                  <li>• 학교 현황 및 니즈 분석</li>
                  <li>• 최적의 파트너 에듀테크 도구 추천</li>
                  <li>• 맞춤형 체험 계획 수립</li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start bg-white rounded-lg p-6 shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                2
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">교사 동의 및 신청</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• 교사 동의서 수집 (15명 이상 또는 전체)</li>
                  <li>• <strong className="text-red-600">지정된 신청 기간 내</strong> 공식 체험 신청서 제출</li>
                  <li>• 체험 일정 및 교육 스케줄 확정</li>
                  <li>• <span className="text-orange-600 text-sm">※ 신청 기간은 별도 안내</span></li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start bg-white rounded-lg p-6 shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                3
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">도구 체험 및 학습</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• 선택한 파트너 도구 무료 체험 시작</li>
                  <li>• AI 챗봇을 통한 자율 학습</li>
                  <li>• 필요시 온라인 교사 연수 참여</li>
                  <li>• 실제 수업에서의 활용 및 피드백 수집</li>
                </ul>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start bg-white rounded-lg p-6 shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                4
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">성과 분석 및 의사결정</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• 체험 기간 중 교육 효과 측정</li>
                  <li>• 교사 및 학생 만족도 조사</li>
                  <li>• 학교 자체 검토 후 도입 여부 결정</li>
                </ul>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start bg-white rounded-lg p-6 shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                5
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">선택적 도입 (옵션)</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• 원하는 도구만 선별적 도입 가능</li>
                  <li>• 지속적인 기술 지원 및 업데이트 제공</li>
                  <li>• 추가 교사 연수 및 컨설팅 지원</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-normal text-gray-900 mb-4">
              💡 오늘배움만의 차별점
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">🔍 엄격한 파트너 선별</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 글로벌 시장에서 검증된 에듀테크만 선별</li>
                <li>• 교육 효과와 사용성을 동시에 만족하는 도구들</li>
                <li>• 지속적인 품질 모니터링 및 관리</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">🎯 정확한 매칭 시스템</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 학교별 특성, 예산, 목표를 종합 분석</li>
                <li>• AI 기반 추천 알고리즘으로 최적 매칭</li>
                <li>• 성공 사례 데이터베이스 활용한 예측 분석</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">🤝 전문적인 지원 체계</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 에듀테크 전문가들의 1:1 컨설팅</li>
                <li>• 24/7 기술 지원 및 문제 해결</li>
                <li>• 정기적인 활용도 점검 및 개선 제안</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">📊 데이터 기반 의사결정</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 체험 기간 중 상세한 사용 데이터 수집</li>
                <li>• 교육 효과 측정을 위한 정량적 지표 제공</li>
                <li>• 객관적 근거 기반의 도입 가이드라인</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expected Effects */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-normal text-gray-900 mb-4">
              🏆 기대 효과
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* 교사에게 */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-6 text-center">교사에게</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold text-lg mr-3">⚡</span>
                  <div>
                    <strong>업무 효율성 향상</strong>: 반복적 업무 자동화로 수업 준비 시간 단축
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold text-lg mr-3">📈</span>
                  <div>
                    <strong>교육 역량 강화</strong>: 최신 에듀테크 활용 능력 습득
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold text-lg mr-3">💡</span>
                  <div>
                    <strong>창의적 수업 설계</strong>: 다양한 도구를 활용한 혁신적 교육 방법 개발
                  </div>
                </li>
              </ul>
            </div>

            {/* 학생에게 */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-6 text-center">학생에게</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-600 font-bold text-lg mr-3">🎯</span>
                  <div>
                    <strong>학습 참여도 증가</strong>: 인터랙티브하고 몰입감 있는 학습 경험
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold text-lg mr-3">👤</span>
                  <div>
                    <strong>개별화 학습</strong>: 개인 수준에 맞춘 맞춤형 교육 제공
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold text-lg mr-3">🚀</span>
                  <div>
                    <strong>미래 역량 개발</strong>: 디지털 리터러시 및 21세기 핵심 역량 함양
                  </div>
                </li>
              </ul>
            </div>

            {/* 학교에게 */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-6 text-center">학교에게</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold text-lg mr-3">🏆</span>
                  <div>
                    <strong>교육 경쟁력 강화</strong>: 최신 기술 도입으로 교육 품질 향상
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold text-lg mr-3">💰</span>
                  <div>
                    <strong>비용 효율성</strong>: 체험 후 선택으로 투자 리스크 최소화
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold text-lg mr-3">🔄</span>
                  <div>
                    <strong>지속 가능한 혁신</strong>: 단계적 도입으로 안정적인 디지털 전환
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Coming Soon
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            혁신적인 교육의 미래가 곧 시작됩니다
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto mb-8">
            <p className="text-lg text-white mb-6">
              <strong>오늘배움 플러스</strong>는 <strong>오늘배움 회원들만을 위한 특별한 서비스</strong>로 곧 공개됩니다!
            </p>
            <div>
              <button
                onClick={openDemoScheduler}
                className="px-8 py-3 rounded-full text-base font-medium text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors duration-200 border border-white/30"
              >
                1:1 상담 신청
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 