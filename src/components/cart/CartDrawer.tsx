'use client';
import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { getCartTotal } from '@/utils/cart';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { supabase } from '@/utils/supabase';
import { User } from '@/utils/supabase';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, dispatch } = useCart();
  const total = getCartTotal(cart.items);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    additionalInfo: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // 장바구니 바깥 영역 클릭 시 닫히는 핸들러
  // 배경이 없으므로 필요 없음
  const handleClickOutside = (e: MouseEvent) => {
    const cartDrawer = document.getElementById('cart-drawer');
    if (cartDrawer && !cartDrawer.contains(e.target as Node)) {
      onClose();
    }
  };

  // 주문 처리 함수
  const handleOrder = () => {
    if (cart.items.length === 0) return;
    setShowForm(true);
  };

  // 고객 정보 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Airtable로 주문 정보 전송
  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    // 필수 입력 필드 검증
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.school) {
      toast.error('이름, 이메일, 전화번호, 학교/기관명은 필수 입력 항목입니다.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 주문 상품 정보 포맷팅
      const orderItems = cart.items.map(item => {
        const orderItem = {
          product: item.name,
          plan: item.plan || '',
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        };

        // Mizou 학교 플랜인 경우 학교 유형과 학생 수 정보 추가
        if (item.name === 'Mizou' && item.plan === '학교 플랜' && item.schoolType && item.studentCount) {
          return {
            ...orderItem,
            schoolType: item.schoolType,
            studentCount: item.studentCount
          };
        }

        return orderItem;
      });

      // 주문 상품 문자열 포맷팅 (Airtable OrderItems 필드용)
      const orderItemsString = cart.items.map(item => {
        // 기본 상품 정보
        let itemString = `${item.name}${item.plan ? ` (${item.plan})` : ''} x${item.quantity}`;

        // Mizou 학교 플랜인 경우 학교 유형과 학생 수 정보 추가
        if (item.name === 'Mizou' && item.plan === '학교 플랜' && item.schoolType && item.studentCount) {
          itemString += ` - ${item.schoolType} (${item.studentCount.toLocaleString()}명)`;
        }

        return itemString;
      }).join(', ');

      // 디버깅 코드 제거

      // Airtable API 호출
      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerInfo,
          orderItems,
          orderItemsString,
          totalAmount: total
        }),
      });

      // 디버깅 코드 제거

      // 응답 본문 가져오기
      const responseData = await response.json();

      if (!response.ok) {
        // 서버에서 오류 응답이 왔을 때 상세 정보 추출
        const errorMessage = responseData.error || responseData.details || '주문 처리 중 오류가 발생했습니다.';
        console.error('API Error details:', responseData);
        throw new Error(errorMessage);
      }

      // 성공 처리
      toast.success('주문이 성공적으로 접수되었습니다!');
      dispatch({ type: 'CLEAR_CART' }); // 장바구니 비우기
      setShowForm(false); // 폼 닫기
      
      // 주문 번호 생성 (YYYYMMDD-XXXX 형식)
      const now = new Date();
      const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
      const randomNum = Math.floor(1000 + Math.random() * 9000); // 1000-9999 사이의 랜덤 숫자
      const generatedOrderNumber = `${dateStr}-${randomNum}`;
      
      // 로컬 스토리지에 주문 데이터 저장 (데이터베이스 연동 문제 대비)
      try {
        // 기존 주문 데이터 가져오기
        const existingOrdersStr = localStorage.getItem('learntoday_orders');
        const existingOrders = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
        
        // 새 주문 데이터 추가
        // 장바구니에서 총금액 계산
        const calculatedTotal = orderItems.reduce((sum, item) => {
          return sum + (item.price * item.quantity);
        }, 0);
        
        const newOrder = {
          id: `local-${Date.now()}`,
          order_number: generatedOrderNumber,
          created_at: now.toISOString(),
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
          customer_school: customerInfo.school,
          additional_info: customerInfo.additionalInfo || '',
          items: orderItems,
          total_amount: calculatedTotal,
          status: 'completed'
        };
        
        // 주문 데이터 추가 및 저장
        existingOrders.unshift(newOrder); // 가장 최근 주문을 맨 앞에 추가
        localStorage.setItem('learntoday_orders', JSON.stringify(existingOrders));
        
        console.log('테스트 주문: 로컬 스토리지에 주문 데이터 저장 성공', newOrder);
      } catch (error) {
        console.error('테스트 주문: 로컬 스토리지 저장 오류', error);
      }
      
      setOrderNumber(generatedOrderNumber);
      setOrderSuccess(true); // 주문 성공 화면 표시

    } catch (error: any) {
      // 상세 에러 로깅
      console.error('Order submission error details:', {
        error,
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'No stack trace',
        type: Object.prototype.toString.call(error)
      });

      // 사용자에게 에러 표시
      const errorMessage = error instanceof Error ? error.message : '주문 처리 중 오류가 발생했습니다.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 로그인 상태 확인 및 사용자 정보 불러오기
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // 디버깅 코드 제거
          // 사용자 메타데이터에서 정보 가져오기 (프로필 테이블 접근 없이)
          const userMeta = session.user.user_metadata || {};

          // 세션 정보만 사용하여 폼 채우기
          setCustomerInfo(prev => ({
            ...prev,
            name: userMeta.name || userMeta.full_name || '',
            email: session.user.email || '',
            phone: userMeta.phone || '',
            school: userMeta.school || ''
          }));
        }
      } catch (error) {
        console.error('사용자 세션 확인 오류:', error);
      }
    };

    if (open) {
      loadUserInfo();
    }
  }, [open]);

  // 장바구니가 열리면 바깥 클릭 이벤트 등록
  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // 주문 완료 후 상태 초기화
  const resetOrderState = () => {
    setOrderSuccess(false);
    setOrderNumber('');
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed top-20 right-4 sm:right-8 z-50 overflow-auto"
    >
      <div
        id="cart-drawer"
        className="max-h-[80vh] w-[95vw] sm:w-[90vw] max-w-md bg-white shadow-2xl rounded-xl transform transition-all duration-300 ease-in-out"
        style={{ boxShadow: 'rgba(60,64,67,0.3) 0px 4px 16px 0px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">장바구니</h2>
          <div className="flex items-center gap-2">
            {cart.items.length > 0 && (
              <button
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                className="text-sm text-red-500 hover:text-red-700"
              >
                전부 비우기
              </button>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl">×</button>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-4 max-h-[50vh] overflow-y-auto">
          {cart.items.length === 0 ? (
            <div className="text-center text-gray-500 mt-16">장바구니가 비어있습니다.</div>
          ) : (
            cart.items.map((item, idx) => {
              // 디버깅 코드 제거
              // 이미지 URL 처리 - 로고 제거로 인해 더 이상 필요하지 않음

              return (
                <div key={`${item.id}-${item.plan ?? 'default'}-${idx}`} className="flex gap-4 items-center border-b pb-4">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{item.name}</div>
{(item.name === 'Perplexity' || item.name === 'Perplexity AI' || item.name === 'ChatGPT' || item.name === 'Claude' || item.name === 'Claude AI') &&
  (item.plan === 'month' || item.plan === '월간') && (
    <div className="text-sm font-bold text-blue-600 mt-1">월간 구독</div>
  )}
{(item.name === 'Perplexity' || item.name === 'Perplexity AI' || item.name === 'ChatGPT' || item.name === 'Claude' || item.name === 'Claude AI') &&
  (item.plan === 'year' || item.plan === '연간') && (
    <div className="text-sm font-bold text-blue-600 mt-1">연간 구독</div>
  )}
{/* Mizou 제품이고 학교 플랜인 경우 */}
{item.name === 'Mizou' && item.plan === '학교 플랜' ? (
  <>
    <div className="text-xs text-gray-500">
      학교 플랜
    </div>
    <p className="text-sm text-gray-600 mt-1">
      {item.schoolType || '학교 플랜'} {item.studentCount ? `(${item.studentCount.toLocaleString()}명)` : ''}
    </p>
  </>
) : (item.plan && !((item.name === 'Perplexity' || item.name === 'Perplexity AI' || item.name === 'ChatGPT' || item.name === 'Claude' || item.name === 'Claude AI') && (item.plan === 'month' || item.plan === '월간' || item.plan === 'year' || item.plan === '연간'))) && (
  <div className="text-xs text-gray-500">{item.plan}</div>
)}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="rounded px-2 py-1 bg-gray-200 hover:bg-gray-300"
                        onClick={() => dispatch({ type: 'CHANGE_QUANTITY', id: item.id, plan: item.plan, quantity: Math.max(1, item.quantity - 1) })}
                      >-</button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        className="rounded px-2 py-1 bg-gray-200 hover:bg-gray-300"
                        onClick={() => dispatch({ type: 'CHANGE_QUANTITY', id: item.id, plan: item.plan, quantity: item.quantity + 1 })}
                      >+</button>
                    </div>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <div className="font-bold text-blue-700">{(item.price * item.quantity).toLocaleString()}원</div>
                    <button
                      className="mt-2 text-xs text-red-500 hover:underline"
                      onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id, plan: item.plan })}
                    >삭제</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {orderSuccess ? (
          <div className="p-6 bg-green-50 rounded-lg shadow-md border-t mt-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">주문이 성공적으로 완료되었습니다!</h3>
              <p className="text-green-700 mb-6">주문해주셔서 감사합니다. 주문 정보를 확인해 보세요.</p>
              
              <div className="bg-white p-4 rounded-lg border border-green-200 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">주문번호</span>
                  <span className="font-bold text-gray-800">{orderNumber}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">주문자</span>
                  <span className="font-bold text-gray-800">{customerInfo.name}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">연락처</span>
                  <span className="font-bold text-gray-800">{customerInfo.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">총 결제금액</span>
                  <span className="font-bold text-blue-700">{total.toLocaleString()}원</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">주문 상세 내역은 입력하신 이메일로 발송되었습니다.<br/>주문과 관련하여 문의사항이 있으시면 연락주세요.</p>
              
              <button
                className="w-full py-3 rounded-lg bg-green-600 text-white font-bold text-base shadow hover:bg-green-700 transition"
                onClick={resetOrderState}
              >
                확인
              </button>
            </div>
          </div>
        ) : !showForm ? (
          <div className="p-4 border-t sticky bottom-0 bg-white z-10">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-lg">총 합계</span>
              <span className="font-bold text-2xl text-blue-700">{total.toLocaleString()}원</span>
            </div>
            <button
              className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-bold text-base shadow hover:bg-blue-700 transition"
              disabled={cart.items.length === 0}
              onClick={handleOrder}
            >
              주문하기
            </button>
          </div>
        ) : (
          <div className="p-6 bg-gray-50 rounded-lg shadow-md border-t mt-4">
            <form onSubmit={submitOrder} className="space-y-6">
              <h3 className="font-bold text-xl mb-4">고객 정보 입력</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름 *</label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일 *</label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">전화번호 *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">학교/기관명 *</label>
                  <input
                    type="text"
                    name="school"
                    value={customerInfo.school}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">기타문의사항</label>
                  <textarea
                    name="additionalInfo"
                    value={customerInfo.additionalInfo}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, additionalInfo: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] bg-white"
                    placeholder="추가 요청사항이나 문의사항이 있으시면 입력해주세요."
                  />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center mt-6 border">
                <span className="font-bold text-lg">총 합계</span>
                <span className="text-blue-700 font-extrabold text-xl">{total.toLocaleString()}원</span>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded-lg bg-gray-200 text-gray-800 font-medium text-base hover:bg-gray-300 transition"
                >
                  뒤로가기
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-bold text-base shadow hover:bg-blue-700 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '처리중...' : '주문 완료'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
