"use client";
import Image from "next/image";
import Link from "next/link";
import { useDemoContext } from "@/context/DemoContext";

export default function MizouPage() {
  const { openDemoScheduler } = useDemoContext();

  const stats = [
    { value: "46%", label: "매출 증가" },
    { value: "36%", label: "온보딩 시간 단축" },
    { value: "42%", label: "숙련도 향상 속도" },
    { value: "50%", label: "고객 만족도 개선" }
  ];

  const scenarios = [
    { icon: "📞", label: "전화 통화" },
    { icon: "💻", label: "화상 회의" },
    { icon: "📊", label: "프레젠테이션 시뮬레이션" },
    { icon: "✍️", label: "제안서 작성" }
  ];

  const testimonials = [
    {
      text: "Mizou를 우리 팀에 배포하는 것은 매끄러운 과정이었습니다. 다국어 직원들을 교육했고, 며칠 만에 첫 세션부터 모범 사례까지 평균 48%의 성과 향상을 보였습니다.",
      name: "Simon Coutand",
      position: "COO, Lameilleureformation.com",
      photo: "👨‍💼"
    },
    {
      text: "Mizou는 교육생들이 연습하고 실수할 수 있는 안전한 공간을 제공하여 실제 고객 과제에 자신 있게 대처할 수 있도록 준비시킵니다. 온보딩 중 이러한 무압박 환경은 매우 귀중합니다.",
      name: "Amine Chafiqui",
      position: "교육 디렉터, BVTC.fr",
      photo: "👨‍🏫"
    },
    {
      text: "관리자들은 Mizou가 제공하는 인사이트를 높이 평가하여 담당자가 준비되었다고 단순히 가정하는 대신 중요한 영역에 집중할 수 있습니다. 영업 담당자가 필요한 정확한 지식을 가지고 있는지 확인할 수 있습니다.",
      name: "Gianni Pozzan",
      position: "대표, 리더십 트레이너",
      photo: "👨‍💻"
    }
  ];

  const workSteps = [
    {
      step: "1",
      title: "AI 에이전트 생성",
      description: "지식 베이스, 통화 녹음, 목표에 맞춰 훈련된 AI 페르소나를 생성하여 더욱 현실적인 시뮬레이션을 제공합니다."
    },
    {
      step: "2", 
      title: "시뮬레이션 시작",
      description: "콜드콜, 회의, 데모, 반박: 설정한 모든 주제에 대해 팀이 연습할 수 있으며, 가이드라인에 맞춘 피드백을 제공합니다."
    },
    {
      step: "3",
      title: "결과 분석", 
      description: "대시보드에서 맞춤형 메트릭과 AI 평가 기준을 모니터링하고, 스킬 격차를 한눈에 파악하여 즉시 조치를 취할 수 있습니다."
    }
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
      <section className="py-16 sm:py-24 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <Image
                    src="/images/mizou.png"
                    alt="Mizou 로고"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Mizou</h1>
                  <p className="text-green-600 font-medium">For Business</p>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                AI 교육 에이전트로 <br />
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  팀 역량 강화
                </span>
              </h2>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Mizou는 신입 직원들이 안전하고 실시간 AI 시뮬레이션 연습과 
                지속적인 개선을 위한 실행 가능한 피드백을 통해 
                잠재력을 최대한 발휘할 수 있도록 도와줍니다.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={openDemoScheduler}
                  className="px-8 py-4 bg-green-600 text-white font-bold rounded-2xl shadow-lg hover:bg-green-700 transition-colors text-lg text-center"
                >
                  데모 예약하기
                </button>
                <button
                  onClick={openDemoScheduler}
                  className="px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl border-2 border-gray-200 hover:bg-gray-50 transition-colors text-lg"
                >
                  상담 받기
                </button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>GDPR 준수</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>1,000+ 기업 사용</span>
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
                    <span className="text-gray-500 text-sm ml-4">Mizou AI 시뮬레이션</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-sm">🎭</span>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-green-100 rounded-full">
                          <div className="h-2 bg-green-500 rounded-full w-3/4 animate-pulse"></div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">AI 고객과 대화 중...</span>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                      <div className="text-sm text-gray-600">
                        <strong>AI 고객:</strong> "가격이 너무 비싼 것 같은데요..."
                      </div>
                      <div className="text-sm text-blue-600">
                        <strong>영업 담당자:</strong> "가치 대비 투자 효과를 말씀드리겠습니다..."
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">실시간 피드백 생성 중...</span>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why AI Training Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              왜 AI 교육 에이전트를 사용해야 할까요?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              AI 에이전트는 팀의 고유한 요구사항에 맞춰 초현실적인 시뮬레이션을 제공합니다. 
              AI 페르소나를 실제 시나리오에 맞춰 조정하고 직원들이 영업을 마스터하고, 
              도전을 극복하며, 커뮤니케이션을 향상시키고, 매력적인 롤플레잉 경험을 통해 뛰어난 성과를 낼 수 있도록 지원합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 mb-8">
              수천 명의 HR 리더, L&D 매니저, CRO가 신뢰합니다. 
              팀이 더 스마트하게 성과를 내고 더 빠른 결과를 달성할 수 있도록 지원합니다.
            </p>
            <button
              onClick={openDemoScheduler}
              className="px-8 py-4 bg-green-600 text-white font-bold rounded-2xl shadow-lg hover:bg-green-700 transition-colors text-lg"
            >
              데모 예약하기
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              어떻게 작동하나요?
            </h2>
          </div>

          <div className="space-y-16">
            {workSteps.map((step, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
                      <div className="text-6xl">
                        {index === 0 && "🎭"}
                        {index === 1 && "🎯"}
                        {index === 2 && "📊"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multiple Scenarios Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              하나의 인텔리전스, 다양한 시나리오
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {scenarios.map((scenario, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{scenario.icon}</div>
                <div className="font-medium text-gray-700">{scenario.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              고객들의 생생한 후기
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-green-500 text-2xl mb-4">❝</div>
                <p className="text-gray-600 mb-6 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{testimonial.photo}</div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.position}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GDPR Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-4 bg-gray-50 rounded-2xl p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-2xl">🔒</span>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">GDPR</div>
              <div className="text-gray-600">준수</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Mizou로 팀 역량을 강화하세요
          </h2>
          <p className="text-xl text-green-100 mb-8">
            현실적인 AI 교육 에이전트로 팀의 잠재력을 최대한 발휘하세요
          </p>
          
          <button
            onClick={openDemoScheduler}
            className="px-8 py-4 bg-white text-green-600 font-bold rounded-2xl shadow-lg hover:bg-gray-50 transition-colors text-lg"
          >
            데모 예약하기
          </button>

          <div className="mt-8 flex justify-center items-center gap-8 text-green-100 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>GDPR 준수</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🚀</span>
              <span>빠른 배포</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📈</span>
              <span>검증된 결과</span>
            </div>
          </div>
        </div>
      </section>

      {/* Back Navigation */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/enterprise"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
          >
            ← 비즈니스 솔루션으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
} 