"use client";
import Image from "next/image";
import Link from "next/link";
import { useDemoContext } from "@/context/DemoContext";

export default function ElevenLabsPage() {
  const { openDemoScheduler } = useDemoContext();

  const coreFeatures = [
    {
      title: "텍스트 음성 변환(TTS)",
      description: "텍스트를 실시간으로 자연스럽고 고품질의 음성으로 변환합니다",
      icon: "🔊"
    },
    {
      title: "음성 복제(Voice Cloning)",
      description: "실제 사람의 목소리를 AI로 복제하여 새로운 콘텐츠를 생성할 수 있으며, 최적의 결과를 위해 30분의 오디오 샘플만 필요합니다",
      icon: "🎭"
    },
    {
      title: "다국어 지원",
      description: "29개 언어와 50개의 억양으로 음성을 생성할 수 있어 글로벌 콘텐츠 제작이 가능합니다",
      icon: "🌍"
    },
    {
      title: "AI 더빙",
      description: "몇 초 만에 29개 언어로 콘텐츠를 번역하고 더빙할 수 있는 기능을 제공합니다",
      icon: "🎬"
    },
    {
      title: "음성 편집",
      description: "생성된 음성의 톤, 속도, 피치, 안정성, 명료성, 억양, 감정 범위 등을 세밀하게 조절할 수 있습니다",
      icon: "🎛️"
    },
    {
      title: "음향 효과 생성",
      description: "프롬프트를 입력하면 원하는 음향 효과를 생성할 수 있습니다",
      icon: "🎵"
    }
  ];

  const useCases = [
    {
      category: "콘텐츠 제작",
      description: "팟캐스트, 비디오 콘텐츠, 오디오북 제작",
      icon: "📱"
    },
    {
      category: "교육",
      description: "교육용 오디오 콘텐츠 생성",
      icon: "📚"
    },
    {
      category: "게임 및 엔터테인먼트",
      description: "게임 캐릭터 음성, 영화 더빙",
      icon: "🎮"
    },
    {
      category: "비즈니스",
      description: "고객 서비스, 마케팅 콘텐츠",
      icon: "💼"
    }
  ];

  const pricingPlans = [
    {
      name: "무료 플랜",
      price: "무료",
      description: "월 10,000자(약 10분 분량) 음성 변환 가능",
      features: ["기본 음성 생성", "제한된 음성 모델", "개인 사용"]
    },
    {
      name: "Starter",
      price: "월 $5",
      description: "월 30,000자 변환 및 추가 기능",
      features: ["향상된 음성 품질", "더 많은 음성 모델", "상업적 사용 가능"]
    },
    {
      name: "Creator",
      price: "월 $22",
      description: "보이스 클로닝 및 고품질 음성 생성",
      features: ["음성 복제 기능", "고품질 음성", "우선 지원"]
    },
    {
      name: "Professional",
      price: "월 $99",
      description: "더 많은 크레딧 및 고급 기능",
      features: ["대량 음성 생성", "API 액세스", "고급 편집 도구"]
    }
  ];

  const howToUse = [
    {
      step: "1",
      title: "계정 생성",
      description: "ElevenLabs 웹사이트에 접속하여 계정을 생성합니다"
    },
    {
      step: "2",
      title: "음성 모델 선택",
      description: "로그인 후 대시보드에서 'Text to Speech' 기능을 선택하고 원하는 음성 모델을 선택합니다"
    },
    {
      step: "3",
      title: "텍스트 입력",
      description: "변환하고 싶은 텍스트를 입력합니다"
    },
    {
      step: "4",
      title: "음성 생성",
      description: "'생성' 버튼을 클릭하여 AI 음성을 생성합니다"
    },
    {
      step: "5",
      title: "설정 조절 및 다운로드",
      description: "필요시 음성 설정을 조절하고 다운로드합니다"
    },
    {
      step: "6",
      title: "음성 복제 (선택사항)",
      description: "음성 복제를 원할 경우 'Voice Lab'에서 음성 샘플을 업로드합니다"
    }
  ];

  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <nav className="mb-8">
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
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/enterprise" className="hover:text-blue-600">엔터프라이즈</Link>
                <span>/</span>
                <span className="text-gray-900">ElevenLabs</span>
              </div>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/ElevenLabs-Logo.png"
                    alt="ElevenLabs 로고"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900">ElevenLabs</h1>
                  <p className="text-lg text-gray-600">최첨단 AI 음성 생성 플랫폼</p>
                </div>
              </div>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                ElevenLabs는 최첨단 AI 기술을 활용하여 자연스럽고 감정이 풍부한 음성을 생성하는 글로벌 음성 AI 플랫폼입니다. 
                2022년 Google의 전 머신러닝 엔지니어와 Palantir의 전 배포 전략가에 의해 뉴욕에서 설립되었습니다.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://try.elevenlabs.io/rno32art6uex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-center"
                >
                  ElevenLabs 시작하기
                </a>
                <button
                  onClick={openDemoScheduler}
                  className="px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  도입 상담받기
                </button>
              </div>
            </div>

            <div className="lg:text-center">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">핵심 기술</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold text-purple-600 mb-2">🧠 신경 컨볼루션 언어 모델</h4>
                    <p className="text-sm text-gray-600">딥러닝 기반 고품질 음성 합성</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold text-purple-600 mb-2">🎯 정밀 음성 분석</h4>
                    <p className="text-sm text-gray-600">피치, 톤, 리듬, 감정 표현 분석</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold text-purple-600 mb-2">🔄 반복 학습 최적화</h4>
                    <p className="text-sm text-gray-600">지속적인 학습으로 더욱 자연스러운 음성</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold text-purple-600 mb-2">🚀 API 개발자 지원</h4>
                    <p className="text-sm text-gray-600">애플리케이션 통합을 위한 API 제공</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 기능 Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">주요 기능</h2>
            <p className="text-lg text-gray-600">
              ElevenLabs가 제공하는 혁신적인 AI 음성 기술
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 사용 방법 Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">사용 방법</h2>
            <p className="text-lg text-gray-600">
              간단한 6단계로 ElevenLabs를 시작해보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {howToUse.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 mt-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 활용 분야 Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">활용 분야</h2>
            <p className="text-lg text-gray-600">
              다양한 분야에서 ElevenLabs를 활용해보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{useCase.category}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가격 플랜 Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">가격 플랜</h2>
            <p className="text-lg text-gray-600">
              다양한 사용자 요구에 맞는 가격 플랜을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow ${index === 2 ? 'bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200' : 'bg-white'}`}>
                {index === 2 && (
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 text-center">
                    추천
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-2xl font-bold text-purple-600 mb-3">{plan.price}</div>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-purple-500 text-lg flex-shrink-0">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Enterprise 플랜은 대규모 사용자를 위한 맞춤형 솔루션입니다.</p>
            <button
              onClick={openDemoScheduler}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              Enterprise 플랜 문의하기
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            언어 장벽을 제거하고 글로벌 콘텐츠를 만들어보세요
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            ElevenLabs로 감정과 억양을 반영한 자연스러운 음성을 생성하여 
            기존 TTS 시스템의 한계를 극복하세요
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://try.elevenlabs.io/rno32art6uex"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl shadow-lg hover:bg-gray-50 transition-colors"
            >
              지금 시작하기
            </a>
            <button
              onClick={openDemoScheduler}
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-purple-600 transition-colors"
            >
              도입 상담받기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 