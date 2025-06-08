"use client";
import Image from "next/image";
import Link from "next/link";
import { useDemoContext } from "@/context/DemoContext";
import { useState } from "react";

export default function EnterprisePage() {
  const { openDemoScheduler } = useDemoContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Most popular");
  
  const saasTools = [
    {
      id: 1,
      name: "CapCut",
      category: "비디오 편집",
      description: "TikTok 제작자가 개발한 강력하고 다재다능한 무료 비디오 편집 소프트웨어",
      features: ["AI 기반 편집", "무료 사용", "멀티미디어 지원", "초보자 친화적"],
      logo: "/images/2-3.png",
      isImage: true,
      color: "from-purple-500 to-pink-500",
      detailUrl: "/enterprise/capcut"
    },
    {
      id: 2,
      name: "HubSpot",
      category: "CRM & Marketing",
      description: "종합 CRM 플랫폼으로 마케팅, 영업, 고객 서비스를 통합하여 디지털 전환을 주도하는 솔루션",
      features: ["무료 CRM", "AI 기반 마케팅", "영업 자동화", "고객 서비스 허브"],
      logo: "/images/hubspot.jpg",
      isImage: true,
      color: "from-orange-500 to-red-500",
      detailUrl: "/enterprise/hubspot"
    },
    {
      id: 3,
      name: "ElevenLabs",
      category: "AI Voice",
      description: "최첨단 AI 기술을 활용하여 자연스럽고 감정이 풍부한 음성을 생성하는 글로벌 음성 AI 플랫폼",
      features: ["AI 음성 생성", "음성 복제", "29개 언어 지원", "실시간 변환"],
      logo: "/images/ElevenLabs-Logo.png",
      isImage: true,
      color: "from-purple-500 to-pink-500",
      detailUrl: "/enterprise/elevenlabs"
    },


    {
      id: 6,
      name: "Slack",
      category: "커뮤니케이션",
      description: "팀 협업 및 커뮤니케이션 플랫폼",
      features: ["실시간 메시징", "파일 공유", "앱 통합", "화상 회의"],
      logo: "💬",
      color: "from-purple-500 to-indigo-500"
    },
    {
      id: 7,
      name: "Fathom",
      category: "AI 회의 노트",
      description: "AI 기반 회의 노트 작성 도구로, 회의 중 노트 작성의 부담을 없애고 대화에 집중할 수 있도록 도와주는 혁신적인 플랫폼",
      features: ["AI 회의 요약", "자동 전사", "28개 언어 지원", "CRM 자동 동기화"],
      logo: "/images/fathom.png",
      isImage: true,
      color: "from-blue-500 to-purple-500",
      detailUrl: "/enterprise/fathom"
    },
    {
      id: 8,
      name: "Mizou For Business",
      category: "AI 교육 시뮬레이션",
      description: "현실적인 AI 구매자와 함께 영업팀을 교육하여 반박 상황을 마스터할 수 있도록 맞춤화된 AI 교육 에이전트",
      features: ["AI 시뮬레이션 교육", "맞춤형 피드백", "안전한 연습 환경", "성과 분석"],
      logo: "/images/mizou.png",
      isImage: true,
      color: "from-green-500 to-blue-500",
      detailUrl: "/enterprise/mizou"
    }
  ];

  // 카테고리 필터링 로직
  const categories = ["Most popular", "Premium", "Free", "Recently added"];
  
  const getFilteredTools = () => {
    let filtered = saasTools;
    
    switch (selectedCategory) {
      case "Most popular":
        return [saasTools[4], saasTools[5], saasTools[2], saasTools[0], saasTools[1]]; // Fathom, Mizou, ElevenLabs, CapCut, HubSpot
      case "Premium":
        return saasTools.filter(tool => tool.id === 2 || tool.id === 3 || tool.id === 7 || tool.id === 8); // HubSpot, ElevenLabs, Fathom, Mizou
      case "Free":
        return saasTools.filter(tool => tool.id === 1 || tool.id === 6); // CapCut, Slack
      case "Recently added":
        return [saasTools[5], saasTools[4]]; // Mizou, Fathom (최근 추가된 것들)
      default:
        return filtered;
    }
  };

  const filteredTools = getFilteredTools();
  
  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">


          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            비즈니스 성장을 위한 <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              프리미엄 비즈니스 솔루션
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            오늘배움이 엄선한 최고의 비즈니스 도구들로 팀의 생산성을 극대화하세요. 
            전문가가 검증한 신뢰할 수 있는 솔루션을 만나보세요.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="CRM, AI 음성생성, 결제시스템, 업무자동화, 팀커뮤니케이션 등 검색..."
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-2xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              href="#tools"
              className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-lg hover:bg-gray-800 transition-colors text-lg"
            >
              도구 둘러보기
            </Link>
            <button
              onClick={openDemoScheduler}
              className="px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl border-2 border-gray-200 hover:bg-gray-50 transition-colors text-lg"
            >
              비즈니스 상담하기
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center gap-8 text-sm text-gray-600 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">✓</span>
              <span>검증된 비즈니스 도구</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">✓</span>
              <span>전문가 추천 솔루션</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">✓</span>
              <span>맞춤형 지원 서비스</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section with Category Filter */}
      <section id="tools" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-between mb-8">
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              1 to {filteredTools.length} of {saasTools.length} results
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool: any) => (
              <div key={tool.id} className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <Link href={tool.detailUrl || "#"} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="w-12 h-12 bg-gradient-to-r rounded-xl flex items-center justify-center text-white text-xl shadow-lg overflow-hidden"
                         style={{background: tool.isImage ? '#ffffff' : `linear-gradient(to right, ${tool.color.split(' ')[1]}, ${tool.color.split(' ')[3]})`}}>
                      {tool.isImage ? (
                        <Image
                          src={tool.logo}
                          alt={`${tool.name} 로고`}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      ) : (
                        tool.logo
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                      <p className="text-sm text-gray-500">{tool.category}</p>
                    </div>
                  </Link>
                  {(tool.id === 1 || tool.id === 3 || tool.id === 7 || tool.id === 8) && (
                    <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded-lg text-xs font-semibold">
                      Premium
                    </div>
                  )}
                </div>

                <Link href={tool.detailUrl || "#"} className="block cursor-pointer">
                  <p className="text-gray-600 mb-4 leading-relaxed hover:text-gray-800 transition-colors">{tool.description}</p>
                </Link>

                <div className="mb-4">
                  <div className="text-sm text-gray-500">{tool.category}</div>
                </div>

                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    {tool.features.map((feature: string, index: number) => (
                      <div key={index} className="text-sm text-gray-600 flex items-center gap-1">
                        <span className="text-blue-500 text-xs">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {tool.detailUrl ? (
                  <Link
                    href={tool.detailUrl}
                    className="block w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                  >
                    자세히 보기
                  </Link>
                ) : (
                  <button 
                    onClick={openDemoScheduler}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    견적 요청하기
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            비즈니스 성장을 가속화할 준비가 되셨나요?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            검증된 프리미엄 도구들로 경쟁 우위를 확보하세요
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={openDemoScheduler}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-lg hover:bg-gray-50 transition-colors"
            >
              맞춤 컨설팅 받기
            </button>
            <button
              onClick={openDemoScheduler}
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-blue-600 transition-colors"
            >
              견적 요청하기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 