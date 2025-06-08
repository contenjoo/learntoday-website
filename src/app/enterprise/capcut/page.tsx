"use client";
import Image from "next/image";
import Link from "next/link";
import { useDemoContext } from "@/context/DemoContext";

export default function CapCutPage() {
  const { openDemoScheduler } = useDemoContext();

  const features = [
    {
      category: "비디오 편집 기능",
      items: [
        "긴 브이로그 자르기, 여러 클립 결합, 비주얼 다듬기",
        "장면 자르기 및 속도 조작 (슬로우 모션, 타임랩스)",
        "스타일리시한 전환 효과로 클립 매끄럽게 결합",
        "전체 범위의 필터와 효과 적용"
      ]
    },
    {
      category: "오디오 편집 기능",
      items: [
        "편리한 볼륨 및 페이드 인/아웃 컨트롤",
        "기존 클립에서 오디오 추출",
        "노이즈 감소 도구로 녹음 정리",
        "배경 트랙 추가, 음성 변환 효과, 텍스트 음성 변환 기능"
      ]
    },
    {
      category: "이미지 편집 기능",
      items: [
        "사진 자르기, 크기 조정, 다듬기",
        "스티커, 텍스트 스타일, 필터 추가",
        "배경 제거 도구로 사진 요소 분리"
      ]
    }
  ];

  const basicTools = [
    { name: "분할", desc: "비디오 클립을 선택한 지점에서 여러 세그먼트로 나누기" },
    { name: "왼쪽/오른쪽 삭제", desc: "분할 후 원하는 섹션 제거" },
    { name: "마커 추가", desc: "비디오의 중요한 지점 표시" },
    { name: "뒤집기, 회전, 크기 조정", desc: "영상 방향 변경 및 중요 부분 자르기" }
  ];

  const advancedTools = [
    { name: "키프레임", desc: "비디오 및 오디오 속성의 정확한 변경 지점 설정" },
    { name: "마스크", desc: "선택적 편집을 위한 특정 영역 분리" },
    { name: "변환", desc: "클립과 이미지 레이어의 스케일링, 회전, 위치 제어" },
    { name: "혼합", desc: "여러 레이어 간 시각적 상호작용 생성" },
    { name: "조정", desc: "밝기, 대비, 색상 균형 미세 조정" },
    { name: "속도 곡선", desc: "시간에 따른 비디오 속도 정확한 제어" }
  ];

  const aiFeatures = [
    "클릭 한 번으로 장면 분할: 긴 비디오를 자동으로 장면별로 분할",
    "AI 기반 자동 캡션: 동영상 대화에 맞는 자막 자동 생성",
    "AI 생성 텍스트 음성 변환: 텍스트를 구어로 변환하여 내레이션 추가",
    "스마트 배경 제거: AI를 활용한 배경 감지 및 제거",
    "긴 비디오를 짧게 변환: 중요한 순간을 자동으로 강조하여 간결한 버전 생성",
    "비디오 번역기: 10개 이상 언어로 비디오 콘텐츠 및 캡션 변환",
    "색상 보정: 영상 색상 자동 조정으로 전문가 수준 품질 구현"
  ];

  const beginnerFeatures = [
    "비디오 템플릿 라이브러리: 미리 만들어진 레이아웃과 전환 효과",
    "고품질 스톡 비디오: 외부 콘텐츠 없이도 전문 동영상 제작 가능",
    "사용자 지정 가능한 텍스트 템플릿: 자막, 제목, 캡션용 다양한 스타일",
    "무료 배경 음악 및 음향 효과: 로열티 프리 오디오 컬렉션",
    "다양한 형식 내보내기: MP4, MOV 등 다양한 형식으로 저장 가능"
  ];

  const exportOptions = [
    "비디오 표지 편집 및 제목 추가",
    "프레임 속도 최대 60fps, 해상도 최대 4K 설정",
    "형식(MOV/MP4), 코덱, 비트 전송률 변경",
    "오디오 형식을 MP3, WAV, FLAC로 변경",
    "저작권 검사 실행 기능"
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
                <span className="text-gray-900">CapCut</span>
              </div>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/2-3.png"
                    alt="CapCut 로고"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900">CapCut</h1>
                  <p className="text-lg text-gray-600">강력하고 다재다능한 무료 비디오 편집 소프트웨어</p>
                </div>
              </div>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                TikTok 제작자가 개발한 전문가 수준의 기능을 제공하면서도 사용하기 매우 쉬워서 
                초보자와 노련한 콘텐츠 제작자 모두에게 훌륭한 선택이 됩니다.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://capcutaffiliateprogram.pxf.io/RGaoAb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-center"
                >
                  사용해보기
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
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">주요 특징</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold text-purple-600 mb-2">🎬 비디오 편집</h4>
                    <p className="text-sm text-gray-600">긴 브이로그 자르기, 클립 결합, 전환 효과</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold text-purple-600 mb-2">🎵 오디오 편집</h4>
                    <p className="text-sm text-gray-600">볼륨 조절, 오디오 추출, 노이즈 감소</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold text-purple-600 mb-2">🖼️ 이미지 편집</h4>
                    <p className="text-sm text-gray-600">사진 자르기, 스티커 추가, 배경 제거</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold text-purple-600 mb-2">🤖 AI 기능</h4>
                    <p className="text-sm text-gray-600">자동 캡션, 배경 제거, 비디오 번역</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 특징 Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">원스톱 멀티미디어 편집 솔루션</h2>
            <p className="text-lg text-gray-600">
              비디오, 오디오, 이미지 편집을 모두 지원하는 통합 솔루션
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.category}</h3>
                <ul className="space-y-3">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <span className="text-purple-500 text-lg flex-shrink-0">✓</span>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 편집 도구 Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 기본 편집 도구 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">기본 편집 도구</h3>
              <div className="space-y-4">
                {basicTools.map((tool, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-purple-600 mb-2">{tool.name}</h4>
                    <p className="text-gray-600 text-sm">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 고급 편집 도구 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">고급 편집 도구</h3>
              <div className="space-y-4">
                {advancedTools.map((tool, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-purple-600 mb-2">{tool.name}</h4>
                    <p className="text-gray-600 text-sm">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI 기능 Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI 기반 스마트 기능</h2>
            <p className="text-lg text-gray-600">
              편집을 더욱 쉽게 만드는 다양한 인공지능 기능
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {feature.split(':')[0]}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {feature.split(':')[1]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 초보자 친화적 기능 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">초보자도 쉽게 사용</h2>
            <p className="text-lg text-gray-600">
              비디오 편집 경험이 없어도 전문적인 결과물 제작 가능
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">편리한 기능들</h3>
              <ul className="space-y-3">
                {beginnerFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-500 text-lg flex-shrink-0">✓</span>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">내보내기 옵션</h3>
              <ul className="space-y-3">
                {exportOptions.map((option, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                    <span className="text-gray-700 text-sm">{option}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 플랫폼 지원 & CTA */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            PC와 모바일 모두에서 사용 가능
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            직관적인 드래그 앤 드롭 인터페이스로 편집 과정을 단순화하여 
            소셜 미디어, YouTube, 개인 프로젝트 등 다양한 용도의 콘텐츠 제작에 적합합니다.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://capcutaffiliateprogram.pxf.io/RGaoAb"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              지금 CapCut 사용해보기
            </a>
            <button
              onClick={openDemoScheduler}
              className="px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl hover:bg-gray-100 transition-colors"
            >
              비즈니스 도입 상담받기
            </button>
          </div>

          <div className="mt-8 text-gray-400 text-sm">
            * 강력하면서도 사용자 친화적인 비디오 편집 도구
          </div>
        </div>
      </section>
    </div>
  );
} 