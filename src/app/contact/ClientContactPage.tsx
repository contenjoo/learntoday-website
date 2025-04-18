"use client";

import { useState, FormEvent, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Quote, submitQuote } from '@/utils/airtable';

export default function ClientContactPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');

  const [formData, setFormData] = useState({
    schoolName: '',
    contactName: '',
    phoneNumber: '',
    email: '',
    orderItems: productId ? `제품 ID: ${productId}` : '',
    additionalInfo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // 입력값 검증 함수
  const validateForm = () => {
    if (!formData.schoolName || !formData.contactName || !formData.phoneNumber || !formData.email) {
      return '모든 필수 항목을 입력해주세요.';
    }
    // 이메일 형식 체크
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return '올바른 이메일 주소를 입력해주세요.';
    }
    // 전화번호 형식 체크 (숫자, -, 공백 허용)
    const phoneRegex = /^[0-9\-\s]+$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      return '전화번호는 숫자, - 만 입력 가능합니다.';
    }
    return '';
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setSubmitResult(null);
    const errorMsg = validateForm();
    if (errorMsg) {
      setSubmitResult({ success: false, message: errorMsg });
      return;
    }
    setIsSubmitting(true);
    try {
      const quoteData: Quote = {
        SchoolName: formData.schoolName,
        ContactName: formData.contactName,
        PhoneNumber: formData.phoneNumber,
        Email: formData.email,
        OrderItems: formData.orderItems,
        AdditionalInfo: formData.additionalInfo,
        OrderDate: new Date().toISOString().split('T')[0],
      };
      const result = await submitQuote(quoteData);
      setSubmitResult(result);
      if (result.success) {
        setFormData({
          schoolName: '',
          contactName: '',
          phoneNumber: '',
          email: '',
          orderItems: '',
          additionalInfo: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitResult({
        success: false,
        message: '문의 제출 중 오류가 발생했습니다. 나중에 다시 시도해주세요.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              견적 문의
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              주식회사 오늘배움의 AI 기반 교육 솔루션에 관심을 가져주셔서 감사합니다. 
              아래 양식을 작성하시면 담당자가 빠르게 연락드리겠습니다.
            </p>
            <div className="mt-9">
              {/* 회사 정보 섹션 */}
              <div className="mt-8 p-4 rounded-lg border border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">회사 정보</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li><span className="font-medium">사업자등록번호:</span> 313-86-02193</li>
                  <li><span className="font-medium">대표:</span> 주방현</li>
                  <li><span className="font-medium">주소(본사):</span> 대전광역시 유성구 지족로351 402호</li>
                  <li><span className="font-medium">주소(이노베이션센터):</span> 대전광역시 서구 만년로68번길 15-20 6층 613호</li>
                  <li><span className="font-medium">전화:</span> 0507-1316-1571</li>
                </ul>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p>02-123-4567</p>
                  <p className="mt-1">평일 9AM-6PM</p>
                </div>
              </div>
              <div className="mt-6 flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V8m0 4v4m0 0a4 4 0 01-8 0"
                    />
                  </svg>
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p>contact@oneullearn.com</p>
                  <p className="mt-1">이메일 문의</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 md:mt-0">
            {submitResult && (
              <div
                role="alert"
                aria-live="assertive"
                className={`mt-4 p-3 rounded-md text-sm font-medium transition-colors duration-300 ${
                  submitResult.success ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'
                }`}
              >
                {submitResult.message}
              </div>
            )}
            {!submitResult && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">
                    학교명
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="schoolName"
                      id="schoolName"
                      required
                      value={formData.schoolName}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                    담당자 이름
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="contactName"
                      id="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    전화번호
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    이메일
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="orderItems" className="block text-sm font-medium text-gray-700">
                    관심 제품
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="orderItems"
                      id="orderItems"
                      value={formData.orderItems}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                    추가 정보
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows={4}
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '제출 중...' : '문의하기'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
