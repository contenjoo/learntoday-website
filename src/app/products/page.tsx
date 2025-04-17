'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import CartButton from '@/components/cart/CartButton';
import CartDrawer from '@/components/cart/CartDrawer';

// 제품 데이터
const products = [
  {
    id: 'redmenta',
    name: 'Redmenta AI',
    description: 'AI 기술을 활용한 교육 자료 생성 도구',
    image: '/images/redmenta.png',
    plans: [
      { id: 'standard', name: 'Standard', price: 150000, priceDisplay: '150,000원/년' },
      { id: 'pro', name: 'Pro', price: 230000, priceDisplay: '230,000원/년' },
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
      { id: 'teacher-team', name: 'Teacher Team', price: 220000, priceDisplay: '220,000원/인당' },
      { id: 'school', name: 'School', price: 1870000, priceDisplay: '1,870,000원/년' },
      { id: 'district', name: 'District', price: 3630000, priceDisplay: '3,630,000원/별도문의' },
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
      { id: 'teacher-pro', name: 'Teacher Pro', price: 330000, priceDisplay: '330,000원/년' },
      { id: 'school', name: '학교', price: 0, priceDisplay: '별도문의' },
    ],
    features: [
      '이미지 상호작용 포인트',
      '360도 가상 투어',
      '포트폴리오 개발',
      '멀티미디어 통합',
    ],
  },
  {
    id: 'briskteaching',
    name: 'BriskTeaching',
    description: '종합 학습관리시스템(LMS)',
    image: '/images/brisk.png',
    plans: [
      { id: 'educator-pro', name: 'Educator Pro', price: 220000, priceDisplay: '220,000원/년' },
      { id: 'school-small', name: 'School (1-399명)', price: 8342400, priceDisplay: '8,342,400원/년' },
      { id: 'school-medium', name: 'School (400-749명)', price: 10238400, priceDisplay: '10,238,400원/년' },
      { id: 'school-large', name: 'School (750-999명)', price: 16922400, priceDisplay: '16,922,400원/년' },
    ],
    features: [
      '교육자료 제작 도구',
      '학생 진도 관리',
      '자동화 피드백',
      '학습 데이터 분석',
    ],
  },
  {
    id: 'padlet',
    name: 'Padlet',
    description: '디지털 협업 및 포트폴리오 도구',
    image: '/images/padlet.png',
    plans: [
      { id: 'basic', name: 'Basic', price: 0, priceDisplay: '무료' },
      { id: 'pro', name: 'Pro', price: 120000, priceDisplay: '120,000원/년' },
      { id: 'school', name: 'School', price: 2500000, priceDisplay: '2,500,000원/년' },
    ],
    features: [
      '직관적인 디지털 게시판',
      '다양한 미디어 지원',
      '실시간 협업',
      '다양한 공유 옵션',
    ],
  },
  {
    id: 'quizizz',
    name: 'Quizizz',
    description: '게임화된 학습 평가 도구',
    image: '/images/quizizz.png',
    plans: [
      { id: 'basic', name: 'Basic', price: 0, priceDisplay: '무료' },
      { id: 'super', name: 'Super', price: 150000, priceDisplay: '150,000원/년' },
      { id: 'school', name: 'School', price: 0, priceDisplay: '별도문의' },
    ],
    features: [
      '게임화된 퀴즈',
      '실시간 결과 분석',
      '맞춤형 학습 경로',
      '다양한 문제 유형',
    ],
  },
];

export default function ProductsPage() {
  const { dispatch } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState<Record<string, string>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteInfo, setQuoteInfo] = useState({
    name: '',
    email: '',
    school: '',
    phone: '',
    message: '',
  });

  // 플랜 선택 핸들러
  const handlePlanSelect = (productId: string, planId: string) => {
    setSelectedPlans(prev => ({
      ...prev,
      [productId]: planId
    }));
  };

  // 수량 변경 핸들러
  const handleQuantityChange = (productId: string, change: number) => {
    setQuantities(prev => {
      const currentQty = prev[productId] || 1;
      const newQty = Math.max(1, currentQty + change);
      return {
        ...prev,
        [productId]: newQty
      };
    });
  };

  // 장바구니 추가 핸들러
  type ProductPlan = {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
};

type ProductType = {
  id: string;
  name: string;
  description: string;
  image: string;
  plans: ProductPlan[];
  features: string[];
};

const handleAddToCart = (product: ProductType) => {
    const selectedPlanId = selectedPlans[product.id] || product.plans[0].id;
    const selectedPlan = product.plans.find((plan: ProductPlan) => plan.id === selectedPlanId);
    const quantity = quantities[product.id] || 1;
    
    if (!selectedPlan) return;
    
    dispatch({
      type: 'ADD_ITEM',
      product: {
        id: product.id,
        name: product.name,
        price: selectedPlan.price,
        image_url: product.image,
        plan: selectedPlan.name,
        quantity: quantity
      }
    });
    
    setIsCartOpen(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 pb-24">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            오늘배움 에듀테크 제품
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            최신 AI 기술과 혁신적인 교육 방법론을 결합한 오늘배움의 에듀테크 제품으로 교육 현장의 혁신을 경험하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              style={{ boxShadow: 'rgba(60,64,67,0.15) 0px 1px 3px 1px' }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="p-6 flex-grow">
                <h2 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">플랜 선택</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.plans.map((plan: any) => (
                      <button
                        key={plan.id}
                        onClick={() => handlePlanSelect(product.id, plan.id)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                          selectedPlans[product.id] === plan.id
                            ? 'bg-blue-100 text-blue-700 ring-1 ring-blue-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {plan.name} - {plan.priceDisplay}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">주요 기능</h3>
                  <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                    {product.features.map((feature: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <svg className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">수량:</span>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button 
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                      onClick={() => handleQuantityChange(product.id, -1)}
                    >
                      -
                    </button>
                    <span className="w-10 text-center">{quantities[product.id] || 1}</span>
                    <button 
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                      onClick={() => handleQuantityChange(product.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path d="M6 6h15l-1.68 8.39A2 2 0 0 1 17.36 16H8.64a2 2 0 0 1-1.96-1.61L4 4H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="21" r="1" fill="currentColor"/>
                    <circle cx="19" cy="21" r="1" fill="currentColor"/>
                  </svg>
                  장바구니에 추가
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">맞춤형 견적이 필요하신가요?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            다수의 라이센스 구매나 학교/기관 단위 도입을 위한 맞춤형 견적을 받아보세요.
            오늘배움의 전문 컨설턴트가 최적의 솔루션을 제안해 드립니다.
          </p>
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            맞춤 견적 문의하기
          </button>
        </div>
      </div>
      
      {/* 장바구니 버튼 */}
      <CartButton onClick={() => setIsCartOpen(true)} />
      
      {/* 장바구니 드로어 */}
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* 견적 문의 모달 */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">맞춤 견적 문의</h2>
              <button onClick={() => setIsQuoteModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={quoteInfo.name}
                  onChange={(e) => setQuoteInfo({...quoteInfo, name: e.target.value})}
                  placeholder="홍길동"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={quoteInfo.email}
                  onChange={(e) => setQuoteInfo({...quoteInfo, email: e.target.value})}
                  placeholder="example@school.edu"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">학교/기관명</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={quoteInfo.school}
                  onChange={(e) => setQuoteInfo({...quoteInfo, school: e.target.value})}
                  placeholder="OO고등학교"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={quoteInfo.phone}
                  onChange={(e) => setQuoteInfo({...quoteInfo, phone: e.target.value})}
                  placeholder="010-1234-5678"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">문의 내용</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  value={quoteInfo.message}
                  onChange={(e) => setQuoteInfo({...quoteInfo, message: e.target.value})}
                  placeholder="필요한 제품과 수량, 특별 요청사항 등을 자유롭게 작성해주세요."
                />
              </div>
              
              <button
                type="button"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                onClick={() => {
                  alert('견적 문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
                  setIsQuoteModalOpen(false);
                }}
              >
                견적 문의하기
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
