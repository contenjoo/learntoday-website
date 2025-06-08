"use client";
import Image from "next/image";
import Link from "next/link";
import { useDemoContext } from "@/context/DemoContext";

export default function FathomPage() {
  const { openDemoScheduler } = useDemoContext();

  const features = [
    {
      title: "자동 회의 기록 및 전사",
      description: "Zoom, Google Meet, Microsoft Teams 회의를 자동으로 녹화하고 실시간으로 전사합니다. 회의가 끝나면 즉시 완전히 전사된 기록과 하이라이트에 접근할 수 있습니다.",
      icon: "🎥"
    },
    {
      title: "AI 기반 회의 요약",
      description: "30분 회의를 1분 읽기로 압축하는 자동 생성 요약 기능을 제공합니다. 요약에는 액션 아이템과 주제별 분석이 포함되어 있습니다.",
      icon: "🤖"
    },
    {
      title: "하이라이트 및 클립 공유",
      description: "회의의 특정 부분을 하이라이트하고 동영상 클립으로 공유할 수 있습니다. Slack에서 맥락을 제공하거나 동료들과 핵심 내용을 공유할 때 매우 유용합니다.",
      icon: "✂️"
    },
    {
      title: "Ask Fathom 기능",
      description: "과거 회의에 대해 자연어로 질문할 수 있는 ChatGPT 스타일의 AI 어시스턴트 기능입니다. 이전 대화 내용을 쉽게 검토하고 특정 정보를 빠르게 찾을 수 있습니다.",
      icon: "💬"
    },
    {
      title: "다국어 지원",
      description: "28개 언어를 지원하여 글로벌 팀의 다양한 언어 요구사항을 충족합니다. 한국어를 비롯해 영어, 스페인어, 프랑스어, 독일어, 일본어, 중국어 등이 포함됩니다.",
      icon: "🌍"
    },
    {
      title: "CRM 자동 동기화",
      description: "Salesforce와 HubSpot과 같은 CRM 시스템에 회의 요약과 작업을 자동으로 동기화하여 회의 후 데이터 입력 작업을 제거합니다.",
      icon: "🔄"
    }
  ];

  const integrations = [
    "Salesforce", "HubSpot", "Google Docs", "Notion", "Asana", 
    "Gmail", "Slack", "Zapier", "Close CRM"
  ];

  const supportedLanguages = [
    "🇰🇷 한국어", "🇺🇸 영어", "🇪🇸 스페인어", "🇫🇷 프랑스어", 
    "🇩🇪 독일어", "🇯🇵 일본어", "🇨🇳 중국어", "🇮🇹 이탈리아어",
    "🇳🇱 네덜란드어", "🇷🇺 러시아어", "🇵🇹 포르투갈어", "🇵🇱 폴란드어"
  ];

  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-gray-50 min-h-screen">
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
      <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <Image
                    src="/images/fathom.png"
                    alt="Fathom 로고"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Fathom</h1>
                  <p className="text-blue-600 font-medium">AI 회의 노트 작성 도구</p>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                회의 중 노트 작성은 <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  이제 그만!
                </span>
              </h2>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Fathom은 AI 기반 회의 노트 작성 도구로, 회의 중 노트 작성의 부담을 없애고 
                대화에 집중할 수 있도록 도와주는 혁신적인 플랫폼입니다. 
                G2에서 5점 만점을 받으며 1위 AI 회의 어시스턴트로 평가받고 있습니다.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="https://fathom.partnerlinks.io/t2e7h8d2cyeu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-colors text-lg text-center"
                >
                  Fathom 무료로 시작하기
                </a>
                <button
                  onClick={openDemoScheduler}
                  className="px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl border-2 border-gray-200 hover:bg-gray-50 transition-colors text-lg"
                >
                  상담 받기
                </button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                  <span>G2에서 5점 만점</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>180,000+ 기업 사용</span>
                </div>
              </div>
            </div>

            <div className="lg:pl-12">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-500 text-sm ml-4">Zoom 회의</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-sm">🎤</span>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-blue-100 rounded-full">
                          <div className="h-2 bg-blue-500 rounded-full w-3/4 animate-pulse"></div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">실시간 전사 중...</span>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                      <div className="text-sm text-gray-600">
                        <strong>김대표:</strong> "다음 분기 마케팅 전략에 대해 논의해보겠습니다..."
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>이팀장:</strong> "새로운 AI 도구 도입을 제안드립니다..."
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">AI 요약 생성 중...</span>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              핵심 기능
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fathom의 강력한 AI 기능으로 회의 생산성을 혁신적으로 향상시키세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              사용법
            </h2>
            <p className="text-xl text-gray-600">
              간단한 5단계로 Fathom을 시작하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { step: "1", title: "설정", desc: "Fathom 계정을 생성하고 무료 버전으로 시작", icon: "⚙️" },
              { step: "2", title: "통합", desc: "사용하는 화상회의 플랫폼과 연결", icon: "🔗" },
              { step: "3", title: "회의 참여", desc: "평소처럼 회의에 참여하면 자동으로 기록 시작", icon: "🎯" },
              { step: "4", title: "하이라이트", desc: "회의 중 중요한 순간에 북마크 기능 사용", icon: "✨" },
              { step: "5", title: "검토", desc: "회의 후 AI 생성 요약과 전사 내용 확인", icon: "📋" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              통합 및 자동화
            </h2>
            <p className="text-xl text-gray-600">
              즐겨 사용하는 도구들과 원클릭 연동
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {integrations.map((integration, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-lg transition-shadow">
                <div className="text-2xl mb-2">🔧</div>
                <span className="text-gray-700 font-medium text-sm">{integration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Language Support Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              다국어 지원
            </h2>
            <p className="text-xl text-gray-600">
              28개 언어로 글로벌 팀과 함께하세요
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {supportedLanguages.map((language, index) => (
              <div key={index} className="bg-white rounded-xl p-3 text-center border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-sm font-medium text-gray-700">{language}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              가격 정책
            </h2>
            <p className="text-xl text-gray-600">
              무료로 시작해서 필요에 따라 업그레이드하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">무료 플랜</h3>
                <div className="text-4xl font-bold text-blue-600 mb-4">무료</div>
                <p className="text-gray-600">개인 사용자를 위한 완전 무료 버전</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">무제한 회의 녹화</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">자동 전사 기능</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">기본 AI 요약</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">하이라이트 기능</span>
                </li>
              </ul>

              <a
                href="https://fathom.partnerlinks.io/t2e7h8d2cyeu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors"
              >
                무료로 시작하기
              </a>
            </div>

            <div className="bg-blue-600 rounded-2xl border-2 border-blue-600 p-8 hover:shadow-xl transition-shadow text-white">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">팀 플랜</h3>
                <div className="text-4xl font-bold mb-4">$19<span className="text-lg">/월/사용자</span></div>
                <p className="text-blue-100">14일 무료 체험 가능</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-blue-200">✓</span>
                  <span>무료 플랜 모든 기능</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-blue-200">✓</span>
                  <span>고급 AI 요약</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-blue-200">✓</span>
                  <span>자동 액션 아이템 생성</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-blue-200">✓</span>
                  <span>팀 관리 기능</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-blue-200">✓</span>
                  <span>심화 분석 기능</span>
                </li>
              </ul>

              <a
                href="https://fathom.partnerlinks.io/t2e7h8d2cyeu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-colors"
              >
                14일 무료 체험하기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            지금 Fathom으로 회의 생산성을 혁신하세요!
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            180,000개 이상의 기업이 선택한 믿을 수 있는 AI 회의 어시스턴트
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://fathom.partnerlinks.io/t2e7h8d2cyeu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-lg hover:bg-gray-50 transition-colors text-lg"
            >
              무료로 시작하기 →
            </a>
            <button
              onClick={openDemoScheduler}
              className="px-8 py-4 bg-transparent text-white font-bold rounded-2xl border-2 border-white hover:bg-white hover:text-blue-600 transition-colors text-lg"
            >
              전문가 상담 받기
            </button>
          </div>

          <div className="mt-8 flex justify-center items-center gap-8 text-blue-100 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <span>⭐</span>
              <span>G2 평점 5점</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>SOC2 보안 인증</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🌍</span>
              <span>28개 언어 지원</span>
            </div>
          </div>
        </div>
      </section>

      {/* Back Navigation */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/enterprise"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← 비즈니스 솔루션으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
} 