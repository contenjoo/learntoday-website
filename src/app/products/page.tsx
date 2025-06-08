'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useDemoContext } from '@/context/DemoContext';
import CartButton from '@/components/cart/CartButton';
import CartDrawer from '@/components/cart/CartDrawer';
import MiniCartToast from '@/components/cart/MiniCartToast';
import dynamic from 'next/dynamic';

// MizouPriceCalculator를 클라이언트 사이드에서만 로드하도록 설정
const MizouPriceCalculator = dynamic(
  () => import('@/components/MizouPriceCalculator'),
  { ssr: false }
);

// Define types for product plans and products
interface ProductPlan {
  id: string;
  name: string;
  price: number;
  monthlyPrice?: number;
  yearlyPrice?: number;
  priceDisplay: string;
  minQuantity?: number;
  features?: string[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  plans: ProductPlan[];
  features: string[];
}

// 제품 데이터
const products = [
  // 신규 추가 제품
  {
    id: 'bookcreator',
    name: 'Book Creator',
    description: '창의적인 디지털 북 제작 도구로 학생과 교사 모두가 쉽게 사용할 수 있는 멀티미디어 전자책 제작 플랫폼입니다.',
    image: '/images/bookcreator.png',
    plans: [
      {
        id: 'teacher',
        name: '교사 1인 플랜',
        price: 230000,
        yearlyPrice: 230000,
        priceDisplay: '230,000원/년',
        features: [
          '무제한 책 생성 가능 (1,000권 이상)',
          '학생 수 제한 없음',
          '텍스트, 이미지, 오디오, 비디오 통합',
          '실시간 공동 편집 기능',
          '오디오북 기능 (텍스트 음성 변환)',
          '다양한 언어 지원 (한국어 포함)',
          'PDF 및 ePub 형식으로 내보내기',
          '온라인 출판 및 공유 기능',
        ]
      },
      {
        id: 'school',
        name: '학교 플랜 (최소 5명이상 결제)',
        price: 0,
        priceDisplay: '별도 문의',
        minQuantity: 5,
        features: [
          '교사 1인 플랜의 모든 기능 포함',
          '최소 5명 이상의 교사 계정 구매 필요',
          '학교 도메인 기반 사용자 관리',
          '중앙 도서관 기능',
          '책 할당 기능',
          'LMS(학습 관리 시스템) 통합',
          '전용 기술 지원',
          '전문적인 교사 교육 제공',
        ]
      },
    ],
    features: [
      '사용자 친화적인 인터페이스로 초보자도 쉽게 사용 가능',
      '텍스트, 이미지, 오디오, 비디오 등 다양한 미디어 통합',
      '학급/모둠 도서관 생성 및 실시간 공동 편집',
      '오디오북 기능 (텍스트 음성 변환)',
      '다양한 언어 지원 (한국어 포함)',
      '디지털 포트폴리오 생성',
      'PDF 및 ePub 형식으로 내보내기',
      '온라인 출판 (URL 또는 QR 코드 생성)',
      '코믹북 템플릿 제공',
      '다양한 형태의 책 제작 가능 (스토리북, 조사보고서, 만화책 등)',
    ],
  },
  {
    id: 'mizou',
    name: 'Mizou',
    description: '교사와 학생을 위한 안전한 AI 챗봇 플랫폼으로, 학습 목표에 맞는 맞춤형 챗봇을 쉽게 만들고 학생들의 AI 활동을 실시간으로 모니터링할 수 있습니다.',
    image: '/images/mizou.png',
    plans: [
      {
        id: 'individual',
        name: '개인',
        price: 270000,
        yearlyPrice: 270000,
        priceDisplay: '270,000원/년',
        description: '학생들과의 원활한 상호작용을 위한 최적의 선택. 하루 최대 250회의 학생 접속을 지원하며, 개인 교사에게 알맞은 기능을 제공합니다.',
        features: [
          '하루 최대 250회 학생 접속',
          '고급 AI 모델 사용',
          '개인정보 보호 및 데이터 보안',
          '50개 이상의 언어 지원',
          '음성 텍스트 변환',
          '텍스트 음성 변환',
          '지식 파일 업로드',
          '평가 루브릭 설정',
          '타이머 기능',
          '인증서 발급'
        ]
      },
      {
        id: 'team',
        name: '팀',
        price: 340000,
        yearlyPrice: 340000,
        priceDisplay: '340,000원/년',
        description: '두 명 이상의 교사나 팀원이 함께 사용하기 위한 플랜. 하루 350회의 학생 접속과 함께 팀원 간 협업을 위한 추가 기능을 제공합니다.',
        features: [
          '하루 최대 350회 학생 접속',
          '고급 AI 모델 사용',
          '개인정보 보호 및 데이터 보안',
          '50개 이상의 언어 지원',
          '음성 텍스트 변환',
          '텍스트 음성 변환',
          '지식 파일 업로드',
          '평가 루브릭 설정',
          '타이머 기능',
          '인증서 발급',
          '프라이빗 작업 공간',
          '관리자 제어 기능'
        ]
      },
      {
        id: 'school',
        name: '학교 플랜',
        price: 1500000,
        yearlyPrice: 1500000,
        priceDisplay: '학생 수에 따라 계산',
        description: '학교나 교육기관을 위한 통합 솔루션. 학생 수에 따라 요금이 계산되며, 무제한 학생 세션과 관리자 기능을 포함합니다.',
        features: [
          '무제한 학생 세션',
          'LMS 통합 지원',
          '자동화된 학생 관리',
          '관리자 패널',
          '전담 계정 관리자',
          '우선 고객 지원',
          '전문적인 교육 및 개발',
          '신학기 프로모션!'
        ],
        customCalculation: true,
        calculatePrice: (students: number): number => {
          // 정확한 경계값 처리를 위해 정수로 변환
          const studentCount = Math.floor(students);

          // 디버깅용 로그


          let price = 0;
          if (studentCount >= 1 && studentCount <= 299) {
            price = 1500000; // 학교 A: 1~299명
          } else if (studentCount >= 300 && studentCount <= 3000) {
            price = 3000000; // 학교 B: 300~3,000명
          } else if (studentCount >= 3001 && studentCount <= 6000) {
            price = 5000000; // 학교 C: 3,001~6,000명
          } else if (studentCount >= 6001 && studentCount <= 10000) {
            price = 9000000; // 학교 D: 6,001~10,000명
          } else if (studentCount > 10000) {
            price = 9000000; // 10,000명 초과 시 최대 가격 적용
          } else if (studentCount <= 0) {
            price = 0; // 유효하지 않은 학생 수
          }

          // 디버깅용 로그 - 가격 계산 확인


          return price;
        },
        priceBreakpoints: [
          { max: 299, price: 1500000, name: '학교 A' },
          { min: 300, max: 3000, price: 3000000, name: '학교 B' },
          { min: 3001, max: 6000, price: 5000000, name: '학교 C' },
          { min: 6001, max: 10000, price: 9000000, name: '학교 D' },
          { min: 10001, price: 9000000, name: '학교 D+' }
        ]
      },
    ],
    features: [
      '맞춤형 챗봇 제작: 교사가 직접 학습 목표에 맞는 AI 챗봇을 쉽게 만들거나 이미 제작된 다양한 챗봇 활용 가능',
      '학생 접근성: 학생들은 별도 계정 생성 없이 교사가 공유한 링크로 바로 접속',
      '실시간 모니터링: 교사가 학생들의 AI 상호작용을 실시간으로 확인 가능',
      '개인화된 학습 지원: 학생 수준에 맞춘 맞춤형 설명과 피드백 제공',
      '토론 및 비판적 사고 촉진: AI 윤리 등 다양한 주제에 대한 토론 유도',
    ],
  },
  {
    id: 'kami',
    name: 'Kami',
    description: '디지털 교실을 위한 PDF 및 문서 주석 도구',
    image: '/images/kami.png',
    plans: [
      {
        id: 'teacher',
        name: '교사 1인(150명 학생 등록가능)',
        price: 220000,
        yearlyPrice: 220000,
        priceDisplay: '220,000원/년',
        features: [
          '40+ 도구 및 기능 접근',
          'Google Classroom 통합',
          'Schoology 통합',
          'Canvas 통합',
          'Microsoft Teams 통합',
          '무료 온보딩 및 트레이닝',
          '우선 고객 지원',
          '신학기 프로모션 가격!',
        ]
      },
      {
        id: 'school',
        name: '스쿨플랜(최소 400명 이상)',
        price: 8000,
        yearlyPrice: 8000,
        minQuantity: 400,
        priceDisplay: '인당 8,000원/년',
        features: [
          '무료 온보딩 및 트레이닝',
          '전단 계정 관리자',
          '도메인 전체 배포',
          '40+ 도구 및 기능 접근',
          'Google Classroom 통합',
          'Schoology 통합',
          'Canvas 통합',
          'Microsoft Teams 통합',
          '우선 고객 지원',
          '신학기 프로모션 가격!',
        ]
      },
    ],
    features: [
      '다양한 파일 지원: PDF, 워드, PPT, 이미지 등',
      '주석 도구: 하이라이트, 밑줄, 취소선, 텍스트 삽입',
      '멀티미디어 통합: 음성, 비디오 녹화 및 댓글',
      '그리기 도구: 자유 형식 그림, 도형, 자 및 각도기',
      '실시간 협업: 여러 학생이 동시에 문서 작업',
      '신학기 프로모션 가격!',
    ],
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    description: 'AI 기반 연구 및 학습 도우미',
    image: '/images/perplexity.png',
    plans: [
      {
        id: 'pro',
        name: 'Pro',
        price: 50000,
        monthlyPrice: 50000,
        yearlyPrice: 500000,
        priceDisplay: '월 50,000원 / 년 500,000원',
        features: [
          '무제한 무료 검색',
          '300회 이상의 프로 검색',
          '더 스마트한 AI 선택: Deepseek R1, OpenAI o3-mini, Claude 3.7 Sonnet, Sonar 등',
          '무제한 파일 업로드',
          'Spaces에서 파일 검색',
          '맞춤형 지식 허브 및 협업 공간',
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise for Education',
        price: 0,
        priceDisplay: '별도 문의',
        features: [
          '증가된 데이터 개인정보 보호',
          '데이터 소유권 보장',
          '사용자 관리',
          '데이터 보존',
          '강화된 보안',
          'SOC2 인증',
          'SSO(단일 로그인) 지원',
        ]
      },
    ],
    features: [
      '최신 정보와 포괄적인 내용으로 수업 주제 연구',
      '긴 문서나 논문을 빠르게 요약',
      '다양한 주제에 대한 최신 자료와 정확한 정보 제공',
      '학생들의 과제 연구를 위한 신뢰할 수 있는 정보 제공',
      '출처 인용 기능으로 정보의 신뢰성 확보',
    ],
  },
  {
    id: 'claude',
    name: 'Claude AI',
    description: '교사들의 업무를 효율적으로 지원하는 인공지능 도구',
    image: '/images/claude.png',
    plans: [
      {
        id: 'pro',
        name: 'Claude Pro',
        price: 50000,
        monthlyPrice: 50000,
        yearlyPrice: 540000,
        priceDisplay: '월 50,000원 / 년 540,000원',
        features: [
          '무료 버전보다 더 많은 사용량',
          'Projects로 문서와 채팅 구성',
          '추가 Claude 모델 접근',
          'Claude 3.7 Sonnet 확장 사고 모드 사용',
          '새로운 기능 선행 접근',
        ]
      },
      {
        id: 'team',
        name: 'Claude Team(최소 5명 이상)',
        price: 65000,
        monthlyPrice: 65000,
        yearlyPrice: 720000,
        minQuantity: 5,
        priceDisplay: '월 65,000원 / 년 720,000원',
        features: [
          'Pro의 모든 기능',
          '더 높은 사용량 한도',
          '새로운 협업 기능 선행 접근',
          '중앙 결제 및 관리',
          '최소 5명 이상 결제 필요',
        ]
      },
    ],
    features: [
      '일상적인 행정 업무 자동화로 교사들의 업무 부담 감소',
      '개인화된 수업 계획 개발 지원',
      '다양한 학문 분야와 교육 수준에 걸친 질문에 상세한 답변 제공',
      '학생들의 강점, 약점, 관심사에 맞춤형 교육 제공',
      '학생 에세이나 답변 검토 및 피드백 제공',
    ],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI에서 개발한 인공지능 대화 시스템',
    image: '/images/chatgpt.png',
    plans: [
      {
        id: 'plus',
        name: 'ChatGPT Plus',
        price: 50000,
        monthlyPrice: 50000,
        yearlyPrice: 600000,
        priceDisplay: '월 50,000원 / 년 600,000원',
        features: [
          '모든 무료 기능',
          '메시지, 파일 업로드, 고급 데이터 분석, 이미지 생성에 한도 증가',
          '표준 및 고급 음성 모드',
          '심층 리서치 및 여러 이성 모델(o3-mini, o3-mini-high, o1)에 액세스',
          '프로젝트를 생성, 사용하고 GPT를 맞춤 설정',
          'Sora 영상 생성에 제한적 액세스',
          '새 기능 테스트 기회',
        ]
      },
      {
        id: 'team',
        name: 'ChatGPT Team(최소 2명 이상)',
        price: 65000,
        monthlyPrice: 65000,
        yearlyPrice: 720000,
        minQuantity: 2,
        priceDisplay: '월 65,000원 / 년 720,000원',
        features: [
          'Plus의 모든 기능',
          '모든 이성 모델 및 GPT-4o에 무제한 액세스',
          '심층 리서치에 더 많은 액세스',
          'GPT-4.5 및 Operator 리서치 프리뷰에 액세스',
          '어려운 질문에 최고의 답변을 드리고자 더 많이 계산하는, o1 pro 모드',
          'Sora 영상 생성에 더 많은 액세스',
          '최소 2명 이상 결제 필요',
        ]
      },
    ],
    features: [
      '맞춤형 수업 계획 및 교육 자료 생성',
      '퀴즈, 시험, 워크시트 제작 지원',
      '자동화된 피드백 및 평가 지원',
      '언어 학습 및 의사소통 강화',
      '연구 지원 및 문헌 검토',
      '4월 30일까지 특별 가격!',
    ],
  },
  {
    id: 'redmenta',
    name: 'Redmenta AI',
    description: 'AI 기술을 활용한 교육 자료 생성 도구',
    image: '/images/redmenta.png',
    plans: [
      { 
        id: 'standard', 
        name: 'AI 기본 플랜', 
        price: 190000, 
        yearlyPrice: 190000,
        priceDisplay: '190,000원/년',
        features: [
          '10GB 저장 공간',
          '기본 AI 생성/편집 도구',
          '무제한 AI 어시스턴트',
          '평가 및 적응형 자료 제작',
          '편집자 협업 시스템',
        ]
      },
      { 
        id: 'pro', 
        name: 'AI PRO 플랜', 
        price: 290000, 
        yearlyPrice: 290000,
        priceDisplay: '290,000원/년',
        features: [
          '50GB 저장 공간',
          'AI 기반 자동 학습자료 생성',
          '우선 고객 지원',
          '고급 협업 툴 패키지',
          'PRO 전용 템플릿 라이브러리',
          '실시간 성능 분석 리포트',
        ]
      },
    ],
    features: [
      'AI 기반 자동 학습자료 생성',
      '워크시트 관리',
      '학생별 진도 추적',
      '개인화 학습자료 제작',
    ],
  },
  {
    id: 'snorkl',
    name: 'Snorkl',
    description: 'AI 피드백을 결합한 디지털 화이트보드 플랫폼',
    image: '/images/snorkl.png',
    plans: [
      { id: 'teacher', name: 'Teacher', price: 250000, priceDisplay: '250,000원/년' },
      { 
        id: 'teacher-team', 
        name: 'Teacher Team (최소 5명)', 
        price: 220000, 
        priceDisplay: '220,000원/인당 (최소 5명)',
        minQuantity: 5,
        features: [
          '디지털 화이트보드',
          'AI 학습 피드백',
          '음성 기록 및 분석',
          '실시간 데이터 분석',
          '최소 5명 이상 결제 필요',
        ]
      },
      { id: 'school', name: 'School', price: 1870000, priceDisplay: '1,870,000원/년' },
      { 
        id: 'district', 
        name: 'District', 
        price: 3630000, 
        priceDisplay: '3,630,000원 (동일지역 5개학교 공동구매시 학교당 726,000원)',
        features: [
          '디지털 화이트보드',
          'AI 학습 피드백',
          '음성 기록 및 분석',
          '실시간 데이터 분석',
          '동일지역 5개학교 공동구매시 학교당 726,000원',
        ]
      },
    ],
    features: [
      '디지털 화이트보드',
      'AI 학습 피드백',
      '음성 기록 및 분석',
      '실시간 데이터 분석',
    ],
  },
  {
    id: 'thinglink',
    name: 'ThingLink',
    description: '몰입형 학습 경험 제공 도구',
    image: '/images/thinglink.png',
    plans: [
      { 
        id: 'teacher-pro', 
        name: 'Teacher License Pro', 
        price: 440000, 
        priceDisplay: '440,000원/년',
        features: [
          '교사 1명과 학생 60명 지원',
          '인터랙티브 이미지 생성',
          '비디오 생성',
          '360°/VR 이미지 생성',
          '3D 모델 생성',
          '시나리오 생성'
        ]
      },
      { 
        id: 'small-school', 
        name: 'Small School', 
        price: 1000000, 
        priceDisplay: '1,000,000원/년',
        features: [
          '최대 10명의 교사 및 200명의 학생 창작자 지원',
          '콘텐츠 업로드 무제한',
          '임베딩 콘텐츠',
          '콘텐츠 참여 통계',
          'ThingLink 로고 제거',
          '협업 편집'
        ]
      },
      { 
        id: 'medium-school', 
        name: 'Medium School', 
        price: 2500000, 
        priceDisplay: '2,500,000원/년',
        features: [
          '최대 25명의 교사 및 500명의 학생 창작자 지원',
          'Small School의 모든 기능 포함',
          '관리자 및 학생 창작자 수용력 증가',
          '1000개 AI 이미지 생성',
          '자동 콘텐츠 번역',
          'Microsoft/Google 통합'
        ]
      },
      { 
        id: 'unlimited-bundle', 
        name: 'Unlimited Bundle', 
        price: 4300000, 
        priceDisplay: '4,300,000원/년',
        features: [
          '무제한 교사 및 학생 창작자 지원',
          'ThingLink의 모든 제품에 무제한 접근',
          '학습 분석 연결',
          'LMS와의 간편한 연동',
          '3000개 AI 이미지 생성',
          '지역별 지원'
        ]
      },
    ],
    features: [
      '인터랙티브 이미지 및 비디오 생성',
      '360° 가상 투어 및 VR 경험',
      '3D 모델 통합 및 상호작용',
      '시나리오 기반 학습 경로 생성',
      '협업 편집 및 공유 기능',
      '다양한 LMS 시스템과 통합'
    ],
  },

  {
    id: 'padlet',
    name: 'Padlet',
    description: '디지털 협업 및 포트폴리오 도구',
    image: '/images/padlet.png',
    plans: [
      {
        id: 'platinum',
        name: 'Platinum',
        price: 180000,
        priceDisplay: '180,000원/년',
        features: [
          '무제한 Padlet',
          '500MB 파일 업로드',
          '1명의 사용자',
          '15분 비디오 녹화',
          '30분 오디오 녹음',
          'API 액세스',
        ]
      },
      {
        id: 'classroom',
        name: '강의실',
        price: 300000,
        priceDisplay: '300,000원/년 (교사 2명, 학생 200명)',
        minQuantity: 2,
        features: [
          '무제한 Padlet',
          '1GB 파일 업로드',
          '200개 무료 사용자 계정',
          '30분 비디오 녹화',
          '60분 오디오 녹음',
          'API 액세스',
          '권한 역할 기반',
          '사용자 관리',
          '콘텐츠 안전 기능',
          '추가 교사 1명당 150,000원',
          '학생 계정 100개 추가 가능',
        ]
      },
      {
        id: 'school',
        name: '학교',
        price: 130000,
        priceDisplay: '130,000원/년 (최소 10명)',
        minQuantity: 10,
        features: [
          '무제한 Padlet',
          '1GB 파일 업로드',
          '무제한 학생 수',
          '30분 비디오 녹화',
          '60분 오디오 녹음',
          'API 액세스',
          '권한 역할 기반',
          '사용자 관리',
          '콘텐츠 안전 기능',
          '분석 대시보드',
          'LMS 통합',
          'SSO 지원',
          '최소 10명 이상 결제',
        ]
      }
    ],
    features: [
      '무제한 Padlet',
      '파일 업로드',
      '비디오/오디오 녹음',
      'API 액세스',
      '역할 기반 권한',
      '사용자 관리',
      '콘텐츠 안전',
    ],
  },
  {
    id: 'quizizz',
    name: 'Quizizz',
    description: '게임화된 학습 평가 및 퀴즈 제작 도구',
    image: '/images/quizizz.png',
    plans: [
      {
        id: 'school-lite',
        name: '스쿨 라이트',
        price: 210000,
        // ...
        yearlyPrice: 210000,
        minQuantity: 10,
        priceDisplay: '210,000원/년 (최소 10명)',
        features: [
          '프리미엄 퀴즈 제작 도구',
          '다양한 문제 유형 지원',
          'LMS 통합 기능',
          '교육과정 연계 콘텐츠',
          '학교 대시보드',
          '학습 분석 도구',
          '※ 라이브러리 500개 제한'
        ]
      },
      {
        id: 'school',
        name: '스쿨',
        price: 8500,
        yearlyPrice: 8500,
        minQuantity: 300,
        priceDisplay: '8,500원/년/인 (최소 300명)',
        features: [
          '프리미엄 퀴즈 제작 도구',
          '무제한 저장 공간',
          '다양한 문제 유형 지원',
          'LMS 통합 기능',
          '교육과정 연계 콘텐츠',
          '학교 대시보드',
          '학습 분석 도구',
          '전담 관리자 지원',
          '※ 라이브러리 무제한'
        ]
      }
    ],
    features: [
      '게임화된 퀴즈와 평가 도구',
      '실시간 학습 데이터 분석',
      '다양한 문제 유형 지원',
      '학교 단위 관리 시스템',
      '교육과정 연계 학습 콘텐츠',
    ],
  },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const isEnterprise = searchParams.get('type') === 'enterprise';
  const { openDemoScheduler } = useDemoContext();
  const { dispatch } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMiniCartVisible, setIsMiniCartVisible] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<any>(null);
  const [selectedPlans, setSelectedPlans] = useState<Record<string, string>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [billingCycles, setBillingCycles] = useState<{[key: string]: 'monthly' | 'yearly'}>({});
  const [mounted, setMounted] = useState(false);
  const [studentCounts, setStudentCounts] = useState<Record<string, number>>({mizou: 100});
  const [showStudentInputs, setShowStudentInputs] = useState<Record<string, boolean>>({});
  const [customPrices, setCustomPrices] = useState<Record<string, number>>({});

  // Initialize client-side only state
  useEffect(() => {
    setMounted(true);
  }, []);



  const toggleBillingCycle = (productId: string) => {
    setBillingCycles(prev => ({
      ...prev,
      [productId]: prev[productId] === 'yearly' ? 'monthly' : 'yearly'
    }));
  };

  const getBillingCycle = (productId: string): 'monthly' | 'yearly' => {
    return billingCycles[productId] || 'yearly';
  };

  const handlePlanSelect = (productId: string, planId: string) => {
    setSelectedPlans(prev => ({
      ...prev,
      [productId]: planId
    }));
    
    // 최소 수량이 필요한 플랜 처리
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const selectedPlan = product.plans.find(p => p.id === planId);
    if (!selectedPlan) return;
    
    // 학생 수 입력 필드 표시 여부 결정
    const needsStudentCount = (productId === 'mizou' && planId === 'school');
    setShowStudentInputs(prev => ({
      ...prev,
      [productId]: needsStudentCount
    }));

    // Mizou 학교 요금제의 경우 기본 학생 수 설정
    if (productId === 'mizou' && planId === 'school') {
      const defaultStudents = 100; // 기본 학생 수

      // 학생 수 설정
      setStudentCounts(prev => ({
        ...prev,
        [productId]: defaultStudents
      }));
    }
    // 최소 수량 확인
    let minQuantity = 1;
    
    // Padlet 학교 플랜인 경우 최소 10개
    if (productId === 'padlet' && planId === 'school') {
      minQuantity = 10;
    } else if (productId === 'claude' && planId === 'team') {
      minQuantity = 5;
    } else if (productId === 'chatgpt' && planId === 'team') {
      minQuantity = 2;
    } else if ('minQuantity' in selectedPlan && typeof selectedPlan.minQuantity === 'number') {
      minQuantity = selectedPlan.minQuantity;
    }
    
    // 최소 수량 설정
    setQuantities(prev => {
      const currentQty = prev[productId] || 1;
      return {
        ...prev,
        [productId]: Math.max(minQuantity, currentQty)
      };
    });
  };

  // 수량 변경 핸들러 (변경값 또는 직접 입력값 모두 처리)
  const handleQuantityChange = (productId: string, change?: number, value?: number) => {
    setQuantities(prev => {
      const currentQty = prev[productId] || 1;
      const selectedPlanId = selectedPlans[productId];
      
      // 최소 수량 설정
      let minQty = 1;
      
      // 특정 플랜에 대한 최소 수량 설정
      if (productId === 'padlet' && selectedPlanId === 'school') {
        minQty = 10;
      } else if (productId === 'claude' && selectedPlanId === 'team') {
        minQty = 5;
      } else if (productId === 'chatgpt' && selectedPlanId === 'team') {
        minQty = 2;
      } else {
        const product = products.find(p => p.id === productId);
        if (product) {
          const selectedPlan = product.plans.find(plan => plan.id === selectedPlanId);
          if (selectedPlan && 'minQuantity' in selectedPlan && typeof selectedPlan.minQuantity === 'number') {
            minQty = selectedPlan.minQuantity;
          }
        }
      }
      
      // 현재 수량이 최소 수량보다 작으면 최소 수량으로 설정
      if (currentQty < minQty) {
        return {
          ...prev,
          [productId]: minQty
        };
      }
      
      // change가 있으면 현재 수량에 추가, 그렇지 않으면 입력된 값 사용
      const newQty = change !== undefined 
        ? Math.max(minQty, currentQty + change)
        : Math.max(minQty, value || minQty);
      return {
        ...prev,
        [productId]: newQty
      };
    });
  };

  // 수량 직접 입력 핸들러 - 통합된 handleQuantityChange 함수 사용
  const handleQuantityInput = (productId: string, value: number) => {
    handleQuantityChange(productId, undefined, value);
  };

  // 학생 수 변경 핸들러 - 직접 가격 계산 방식
  const handleStudentCountChange = (productId: string, value: number) => {
    // 정수로 변환하여 정확한 경계값 처리 (최소 1명)
    const studentCount = Math.max(1, Math.floor(value));

    // 학생 수 상태 업데이트
    setStudentCounts(prev => ({
      ...prev,
      [productId]: studentCount
    }));

    // Mizou 학교 플랜인 경우 즉시 가격 계산 및 업데이트
    if (productId === 'mizou' && selectedPlans[productId] === 'school') {
      const product = products.find(p => p.id === productId);
      if (product) {
        const schoolPlan = product.plans.find(p => p.id === 'school');
        if (schoolPlan && 'calculatePrice' in schoolPlan && typeof schoolPlan.calculatePrice === 'function') {
          // 학생 수에 따른 가격 계산
          const price = schoolPlan.calculatePrice(studentCount);

          // 즉시 가격 상태 업데이트 - 비동기 처리 제거
          setCustomPrices(prev => ({
            ...prev,
            [product.id]: price
          }));
        }
      }
    }
  };

  const getRedmentaDiscountedPrice = (selectedPlanId: string, quantity: number) => {
    // 기본 가격
    let basePrice = selectedPlanId === 'standard' ? 190000 : 290000;
    
    // 수량에 따른 할인 가격
    if (quantity >= 2 && quantity <= 5) {
      return selectedPlanId === 'standard' ? 180000 : 280000;
    } else if (quantity >= 6 && quantity <= 19) {
      return selectedPlanId === 'standard' ? 170000 : 270000;
    } else if (quantity >= 20) {
      return null; // 별도 협의
    }
    
    return basePrice;
};

  const handleAddToCart = (product: Product) => {
    const selectedPlanId = selectedPlans[product.id] || product.plans[0].id;
    const selectedPlan = product.plans.find((plan: ProductPlan) => plan.id === selectedPlanId);
    const quantity = quantities[product.id] || 1;
    
    if (!selectedPlan) return;
    
    // 선택된 결제 주기에 따라 가격 설정
    let price = selectedPlan.price;
    
    // Mizou 학교 플랜인 경우 계산된 가격 사용
    if (product.id === 'mizou' && selectedPlanId === 'school' && customPrices[product.id]) {
      price = customPrices[product.id];
    }
    // 월간 결제 옵션이 있는 제품인지 확인 (Perplexity, Claude, ChatGPT만 적용)
    else if (['perplexity', 'claude', 'chatgpt'].includes(product.id)) {
    const currentBillingCycle = getBillingCycle(product.id);
    
      // 월별 결제인 경우 monthlyPrice 사용
      if (currentBillingCycle === 'monthly' && 'monthlyPrice' in selectedPlan && typeof selectedPlan.monthlyPrice === 'number') {
      price = selectedPlan.monthlyPrice;
    } 
    // 연간 결제인 경우 yearlyPrice 사용
    else if (currentBillingCycle === 'yearly' && 'yearlyPrice' in selectedPlan && typeof selectedPlan.yearlyPrice === 'number') {
      price = selectedPlan.yearlyPrice;
    }
    }
    // Redmenta AI 볼륨 할인 적용
    else if (product.id === 'redmenta') {
      const discountedPrice = getRedmentaDiscountedPrice(selectedPlanId, quantity);
      if (discountedPrice === null) {
        return; // 20개 이상은 별도 협의
      } else {
        price = discountedPrice;
      }
    }

    // 수량에 따른 가격 계산 (최소 수량이 있는 경우만)
    if (selectedPlan.minQuantity && selectedPlan.minQuantity > 1) {
      price = price * quantity;
    }
    
    let planValue = selectedPlan.name;
    if (['perplexity', 'claude', 'chatgpt'].includes(product.id)) {
      const billingCycle = getBillingCycle(product.id);
      planValue = billingCycle === 'monthly' ? 'month' : 'year';
    }

    const newItem = {
      id: `${product.id}-${selectedPlanId}-${Date.now()}`,
      product: product.id,
      name: product.name,
      plan: planValue,
      price: price,
      quantity: quantity,
      image_url: product.image
    };
    
    dispatch({
      type: 'ADD_ITEM',
      product: newItem
    });
    
    setLastAddedItem(newItem);
    setIsMiniCartVisible(true);
  };

  if (!mounted) {
    return <div className="container mx-auto px-4 py-8 pb-24 flex justify-center items-center min-h-[60vh]">
      <div className="animate-pulse text-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    </div>;
  }

  // 엔터프라이즈 타입인 경우 별도 렌더링
  if (isEnterprise) {
    return (
      <div className="font-[family-name:var(--font-geist-sans)]">
        <div className="container mx-auto px-4 py-8 pb-24">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              오늘배움 엔터프라이즈 솔루션
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              기업 맞춤형 AI 교육 및 업무 혁신 솔루션을 준비하고 있습니다.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto text-center py-16">
                         <div className="mb-8">
               <div className="mx-auto h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center">
                 <span className="text-4xl">🏢</span>
               </div>
             </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              엔터프라이즈 전용 솔루션 준비 중
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              기업의 특별한 요구사항에 맞춘 맞춤형 AI 교육 솔루션과 업무 혁신 도구를 개발하고 있습니다. <br />
              전문 컨설턴트와의 상담을 통해 귀하의 비즈니스에 최적화된 솔루션을 제안해드립니다.
            </p>
            <div className="space-y-4">
              <button
                onClick={openDemoScheduler}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-colors"
              >
                맞춤 솔루션 상담받기
              </button>
              <div className="text-sm text-gray-500">
                전문가와의 1:1 상담으로 최적의 솔루션을 찾아보세요
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <MiniCartToast 
        isVisible={isMiniCartVisible} 
        onClose={() => setIsMiniCartVisible(false)} 
        onViewCart={() => setIsCartOpen(true)}
        newItemAdded={lastAddedItem}
      />
      <div className="container mx-auto px-4 py-8 pb-24">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            오늘배움 에듀테크 제품
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">최신 AI 기술과 혁신적인 교육 방법론을 결합한 오늘배움의 에듀테크 제품으로 교육 현장의 혁신을 경험하세요.</p>
        </div>
        
        {/* AI 제품 섹션 (Perplexity, Claude, ChatGPT) */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center">교육용 AI 서비스</h2>
          
          {/* AI 제품 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12">
            {products
              .filter(product => ['perplexity', 'claude', 'chatgpt'].includes(product.id))
              .map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                  style={{ boxShadow: 'rgba(60,64,67,0.15) 0px 1px 3px 1px' }}
                >
                  <div className="relative h-48 overflow-hidden bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={100}
                      style={{ objectFit: 'contain', padding: '10px' }}
                      className="transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-6 flex-grow">
                    <h2 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h2>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    
                    {/* 월간/연간 결제 선택 토글 - AI 제품만 표시 */}
                    {['perplexity', 'claude', 'chatgpt'].includes(product.id) && (
                      <div className="mb-4">
                        <div className="flex items-center justify-start gap-3 mb-2">
                          <span className={`text-sm font-medium ${getBillingCycle(product.id) === 'monthly' ? 'text-blue-600' : 'text-gray-500'}`}>월별 결제</span>
                          <div 
                            className="relative inline-flex h-5 w-10 items-center rounded-full bg-gray-200 transition-colors focus:outline-none data-[state=checked]:bg-blue-600" 
                            onClick={() => toggleBillingCycle(product.id)}
                          >
                            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${getBillingCycle(product.id) === 'yearly' ? 'translate-x-5.5' : 'translate-x-1'}`} />
                          </div>
                          <span className={`text-sm font-medium ${getBillingCycle(product.id) === 'yearly' ? 'text-blue-600' : 'text-gray-500'}`}>연간 결제</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 mb-2">플랜 선택</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {product.plans.map(plan => (
                          <button
                            key={plan.id}
                            onClick={() => handlePlanSelect(product.id, plan.id)}
                            className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-full transition-colors ${
                              selectedPlans[product.id] === plan.id
                                ? 'bg-blue-100 text-blue-700 ring-1 ring-blue-300'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {plan.name} - {
                              (() => {
                                const hasMonthlyOption = ['perplexity', 'claude', 'chatgpt'].includes(product.id);
                                if (hasMonthlyOption && getBillingCycle(product.id) === 'monthly' && 'monthlyPrice' in plan && typeof plan.monthlyPrice === 'number') {
                                  return `${plan.monthlyPrice.toLocaleString()}원/월`;
                                } else if (getBillingCycle(product.id) === 'yearly' && 'yearlyPrice' in plan && typeof plan.yearlyPrice === 'number') {
                                  return `${plan.yearlyPrice.toLocaleString()}원/년`;
                                }
                                return plan.priceDisplay;
                              })()
                            }
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 mb-2">주요 기능</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1">
                        {(() => {
                          const selectedPlanId = selectedPlans[product.id] || product.plans[0].id;
                          const selectedPlan = product.plans.find(plan => plan.id === selectedPlanId);
                          let featuresToShow: string[] = [];
                          
                          if (selectedPlan && 'features' in selectedPlan && Array.isArray(selectedPlan.features)) {
                            featuresToShow = selectedPlan.features;
                          }
                          
                          if (featuresToShow.length > 0) {
                            return featuresToShow.map((feature: string, idx: number) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start">
                                <svg className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>{feature}</span>
                              </li>
                            ));
                          } else {
                            return product.features.map((feature: string, idx: number) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                              <svg className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ));
                          }
                        })()
                      }
                      </ul>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex-1 flex items-center border rounded-lg overflow-hidden">
                        <button 
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={quantities[product.id] || 1}
                          onChange={(e) => {
                            const newValue = parseInt(e.target.value) || 1;
                            setQuantities(prev => ({
                              ...prev,
                              [product.id]: Math.max(1, newValue)
                            }));
                          }}
                          className="flex-1 text-center py-2 focus:outline-none"
                          data-component-name="ProductsPage"
                        />
                        <button 
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {(() => {
                      const selectedPlanId = selectedPlans[product.id] || product.plans[0].id;
                      const selectedPlan = product.plans.find(plan => plan.id === selectedPlanId);
                      const quantity = quantities[product.id] || 1;
                      
                      if (!selectedPlan) return null;

                      // Mizou 학교 요금제의 경우 가격 계산기 표시
                      if (product.id === 'mizou' && selectedPlanId === 'school') {
                        return (
                          <div className="mb-3">
                            <MizouPriceCalculator
                              initialStudentCount={studentCounts[product.id] || 300}
                              onStudentCountChange={(count) => handleStudentCountChange(product.id, count)}
                              onAddToCart={(price, schoolType, studentCount) => {
                                // 가격 저장 후 장바구니에 추가
                                setCustomPrices(prev => ({
                                  ...prev,
                                  [product.id]: price
                                }));

                                // 학교 유형과 학생 수 정보 저장
                                localStorage.setItem(`mizou_school_type_${product.id}`, schoolType);
                                localStorage.setItem(`mizou_student_count_${product.id}`, studentCount.toString());

                                // 장바구니에 추가 - 전체 product 객체 전달
                                handleAddToCart(product);
                              }}
                            />
                          </div>
                        );
                      }
                      
                      // 가격 계산
                      let price = selectedPlan.price;
                      const hasMonthlyOption = ['perplexity', 'claude', 'chatgpt'].includes(product.id);
                      const currentBillingCycle = getBillingCycle(product.id);
                      
                      if (hasMonthlyOption && currentBillingCycle === 'monthly' && 'monthlyPrice' in selectedPlan && typeof selectedPlan.monthlyPrice === 'number') {
                        price = selectedPlan.monthlyPrice;
                      } else if (currentBillingCycle === 'yearly' && 'yearlyPrice' in selectedPlan && typeof selectedPlan.yearlyPrice === 'number') {
                        price = selectedPlan.yearlyPrice;
                      }
                      
                      const totalPrice = price * quantity;
                      
                      return (
                        <div className="mb-3 text-center">
                          <span className="font-semibold text-blue-700">계산된 견적 가격: {totalPrice.toLocaleString()}원</span>
                        </div>
                      );
                    })()}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                                        <span className="cart-icon flex items-center justify-center">
                    <i className="inline-block w-5 h-5 relative">
                      <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        🛒
                      </span>
                    </i>
                  </span>
                      장바구니에 추가
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        {/* 기타 제품 섹션 */}
        <h2 className="text-2xl font-bold mb-4 text-center">교육용 툴 및 서비스</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12">
          {products
            .filter(product => !['perplexity', 'claude', 'chatgpt'].includes(product.id))
            .map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              style={{ boxShadow: 'rgba(60,64,67,0.15) 0px 1px 3px 1px' }}
            >
              <div className="relative h-48 overflow-hidden bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={100}
                  style={{ objectFit: 'contain', padding: '10px' }}
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="p-6 flex-grow">
                <h2 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">플랜 선택</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {product.plans.map(plan => (
                      <button
                        key={plan.id}
                        onClick={() => handlePlanSelect(product.id, plan.id)}
                        className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-full transition-colors ${
                          selectedPlans[product.id] === plan.id
                            ? 'bg-blue-100 text-blue-700 ring-1 ring-blue-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {plan.name} - {
                          (() => {
                            const hasMonthlyOption = ['perplexity', 'claude', 'chatgpt'].includes(product.id);
                            if (hasMonthlyOption && getBillingCycle(product.id) === 'monthly' && 'monthlyPrice' in plan && typeof plan.monthlyPrice === 'number') {
                              return `${plan.monthlyPrice.toLocaleString()}원/월`;
                            } else if (getBillingCycle(product.id) === 'yearly' && 'yearlyPrice' in plan && typeof plan.yearlyPrice === 'number') {
                              return `${plan.yearlyPrice.toLocaleString()}원/년`;
                            }
                            return plan.priceDisplay;
                          })()
                        }
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">주요 기능</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1">
                    {(() => {
                      const selectedPlanId = selectedPlans[product.id] || product.plans[0].id;
                      const selectedPlan = product.plans.find(plan => plan.id === selectedPlanId);
                      let featuresToShow: string[] = [];
                      
                      if (selectedPlan && 'features' in selectedPlan && Array.isArray(selectedPlan.features)) {
                        featuresToShow = selectedPlan.features;
                      }
                      
                      if (featuresToShow.length > 0) {
                        return featuresToShow.map((feature: string, idx: number) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <svg className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ));
                      } else {
                        return product.features.map((feature: string, idx: number) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <svg className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ));
                      }
                    })()
                  }
                  </ul>
                  {product.id === 'padlet' && selectedPlans[product.id] === 'school' && (
                    <div className="mt-2 text-xs text-orange-600 font-medium">
                      * 학교 플랜은 최소 10명 이상 결제 필요
                    </div>
                  )}
                </div>
              </div>
              
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    {product.id === 'mizou' && selectedPlans[product.id] === 'school' ? '학생 수:' : '수량:'}
                  </span>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button 
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                      onClick={() => {
                        if (product.id === 'mizou' && selectedPlans[product.id] === 'school') {
                          // Mizou 학교 플랜인 경우 학생 수 감소
                          const currentStudents = studentCounts[product.id] || 300;
                          handleStudentCountChange(product.id, Math.max(1, currentStudents - 10));
                        } else {
                          handleQuantityChange(product.id, -1);
                        }
                      }}
                      disabled={product.id === 'padlet' && selectedPlans[product.id] === 'school' && (quantities[product.id] || 10) <= 10}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={product.id === 'padlet' && selectedPlans[product.id] === 'school' ? 10 : 1}
                      value={
                        product.id === 'mizou' && selectedPlans[product.id] === 'school'
                          ? studentCounts[product.id] || 300
                          : product.id === 'padlet' && selectedPlans[product.id] === 'school'
                        ? Math.max(10, quantities[product.id] || 10) 
                            : quantities[product.id] || 1
                      }
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value) || 1;

                        if (product.id === 'mizou' && selectedPlans[product.id] === 'school') {
                          // Mizou 학교 플랜인 경우 학생 수 업데이트
                          handleStudentCountChange(product.id, newValue);
                        } else {
                          // 다른 제품인 경우 수량 업데이트
                          const minValue = product.id === 'padlet' && selectedPlans[product.id] === 'school' ? 10 : 1;
                          setQuantities(prev => ({
                            ...prev,
                            [product.id]: Math.max(minValue, newValue)
                          }));
                        }
                      }}
                      className="w-16 text-center focus:outline-none"
                      data-component-name="ProductsPage"
                    />
                    <button 
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                      onClick={() => {
                        if (product.id === 'mizou' && selectedPlans[product.id] === 'school') {
                          // Mizou 학교 플랜인 경우 학생 수 증가
                          const currentStudents = studentCounts[product.id] || 300;
                          handleStudentCountChange(product.id, currentStudents + 10);
                        } else {
                          handleQuantityChange(product.id, 1);
                        }
                      }}
                      disabled={product.id === 'padlet' && selectedPlans[product.id] === 'classroom' && (quantities[product.id] || 2) >= 9}
                    >
                      +
                    </button>
                  </div>
                </div>
                {(() => {
                  const selectedPlanId = selectedPlans[product.id] || product.plans[0].id;
                  const selectedPlan = product.plans.find(plan => plan.id === selectedPlanId);
                  const quantity = product.id === 'padlet' && selectedPlanId === 'school' 
                    ? Math.max(10, quantities[product.id] || 10) 
                    : quantities[product.id] || 1;
                  
                  if (!selectedPlan) return null;
                  
                  // 가격 계산
                  let price = selectedPlan.price;
                  let totalPrice = price;
                  let unitPrice = price;
                  
                  if ('yearlyPrice' in selectedPlan && typeof selectedPlan.yearlyPrice === 'number') {
                    price = selectedPlan.yearlyPrice;
                    unitPrice = price;
                  }
                  
                  // Mizou 학교 플랜의 경우 학생 수에 따른 가격 계산
                  if (product.id === 'mizou' && selectedPlanId === 'school') {
                    const studentCount = studentCounts[product.id] || 300;

                    // 학생 수에 따른 가격 계산
                    if (studentCount >= 1 && studentCount <= 299) {
                      totalPrice = 1500000; // 학교 A: 1~299명
                    } else if (studentCount >= 300 && studentCount <= 3000) {
                      totalPrice = 3000000; // 학교 B: 300~3,000명
                    } else if (studentCount >= 3001 && studentCount <= 6000) {
                      totalPrice = 5000000; // 학교 C: 3,001~6,000명
                    } else if (studentCount >= 6001 && studentCount <= 10000) {
                      totalPrice = 9000000; // 학교 D: 6,001~10,000명
                    } else if (studentCount > 10000) {
                      totalPrice = 9000000; // 10,000명 초과 시 최대 가격 적용
                    }

                    // customPrices 상태 업데이트
                    if (customPrices[product.id] !== totalPrice) {
                      setCustomPrices(prev => ({
                        ...prev,
                        [product.id]: totalPrice
                      }));
                    }
                  }
                  // Padlet 강의실 플랜의 경우 특별 가격 계산 로직
                  else if (product.id === 'padlet' && selectedPlanId === 'classroom') {
                    // 기본 가격 300,000원 (교사 2명, 학생 200명)
                    // 추가 교사 1명당 150,000원 (학생 100명 포함)
                    // 최대 교사 9명까지 추가 가능 (총 11명)
                    const baseQuantity = 2; // 기본 교사 수
                    // 수량은 최대 9까지만 가능
                    const limitedQuantity = Math.min(9, quantity);
                    const additionalTeachers = Math.max(0, limitedQuantity - baseQuantity);
                    totalPrice = price + (additionalTeachers * 150000);
                  } else if (product.id === 'redmenta') {
                    const discountedPrice = getRedmentaDiscountedPrice(selectedPlanId, quantity);
                    
                    if (discountedPrice === null) {
                      return (
                        <div className="mb-3">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="font-semibold text-blue-700 text-center">20개 이상: 별도 협의</p>
                            <p className="text-sm text-blue-600 mt-1 text-center">대량 구매 할인 적용</p>
                          </div>
                        </div>
                      );
                    } else {
                      unitPrice = discountedPrice;
                      totalPrice = unitPrice * quantity;
                      
                      const originalPrice = selectedPlanId === 'standard' ? 190000 : 290000;
                      const isDiscounted = unitPrice < originalPrice;
                      
                      return (
                        <div className="mb-3">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="font-semibold text-blue-700 text-center">총 가격: {totalPrice.toLocaleString()}원</p>
                            <div className="flex justify-center items-center gap-2 mt-1">
                              <p className="text-sm text-blue-600">
                                계정당 {unitPrice.toLocaleString()}원
                              </p>
                              {isDiscounted && (
                                <span className="bg-orange-100 text-orange-700 text-xs px-1.5 py-0.5 rounded">
                                  볼륨 할인
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 text-center mt-1">
                              {quantity}개 × {unitPrice.toLocaleString()}원
                            </p>
                          </div>
                        </div>
                      );
                    }
                  } else {
                    totalPrice = price * quantity;
                  }
                  
                  // Mizou 학교 플랜의 경우 학교 유형과 학생 수 표시
                  if (product.id === 'mizou' && selectedPlanId === 'school') {
                    const studentCount = studentCounts[product.id] || 300;
                    let schoolType = '';

                    // 학생 수에 따른 학교 유형 결정
                    if (studentCount >= 1 && studentCount <= 299) {
                      schoolType = '학교 A';
                    } else if (studentCount >= 300 && studentCount <= 3000) {
                      schoolType = '학교 B';
                    } else if (studentCount >= 3001 && studentCount <= 6000) {
                      schoolType = '학교 C';
                    } else if (studentCount >= 6001 && studentCount <= 10000) {
                      schoolType = '학교 D';
                    } else {
                      schoolType = '학교 D+';
                    }

                    return (
                      <div className="mb-3 text-center">
                        <span className="font-semibold text-blue-700">계산된 견적 가격: {totalPrice.toLocaleString()}원</span>
                        <p className="text-sm text-gray-600 mt-1">{schoolType} ({studentCount.toLocaleString()}명)</p>
                      </div>
                    );
                  }
                  // Padlet 강의실 플랜의 경우 교사 수와 학생 수 표시
                  else if (product.id === 'padlet' && selectedPlanId === 'classroom') {
                    const baseQuantity = 2; // 기본 교사 수
                    // 수량은 최대 9까지만 가능
                    const limitedQuantity = Math.min(9, quantity);
                    const additionalTeachers = Math.max(0, limitedQuantity - baseQuantity);
                    const totalTeachers = baseQuantity + additionalTeachers;
                    const totalStudents = 200 + (additionalTeachers * 100); // 기본 200명 + 추가 교사당 100명
                    
                    return (
                      <div className="mb-3">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="font-semibold text-blue-700 text-center">총 가격: {totalPrice.toLocaleString()}원</p>
                          <p className="text-sm text-blue-600 text-center mt-1">교사 {totalTeachers}명, 학생 {totalStudents}명</p>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="mb-3">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="font-semibold text-blue-700 text-center">총 가격: {totalPrice.toLocaleString()}원</p>
                          {quantity > 1 && (
                            <p className="text-xs text-gray-500 text-center mt-1">
                              {quantity}개 × {unitPrice.toLocaleString()}원
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  }
                })()}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span className="cart-icon flex items-center justify-center">
                    <i className="inline-block w-5 h-5 relative">
                      <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        🛒
                      </span>
                    </i>
                  </span>
                  장바구니에 추가
                </button>
              </div>
            </div>
          ))}
        </div>
        

      </div>
      
      {/* 장바구니 버튼 */}
      <CartButton onClick={() => setIsCartOpen(true)} />
      
      {/* 장바구니 드로어 */}
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
