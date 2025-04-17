'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Quote, submitQuote } from '@/utils/airtable';

// SearchParams 컴포넌트 분리
function SearchParamsWrapper() {
  const searchParams = useSearchParams();
  return searchParams.get('product');
}

export default function ContactPage() {
  // Suspense로 감싸서 사용
  const productId = (
    <Suspense fallback={null}>
      <SearchParamsWrapper />
    </Suspense>
  );
  
  const [formData, setFormData] = useState({
    schoolName: '',
    contactName: '',
    phoneNumber: '',
    email: '',
    orderItems: typeof productId === 'string' ? `제품 ID: ${productId}` : '',
    additionalInfo: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare the quote data
      const quoteData: Quote = {
        SchoolName: formData.schoolName,
        ContactName: formData.contactName,
        PhoneNumber: formData.phoneNumber,
        Email: formData.email,
        OrderItems: formData.orderItems,
        AdditionalInfo: formData.additionalInfo,
        OrderDate: new Date().toISOString().split('T')[0],
      };
      
      // Submit to Airtable
      const result = await submitQuote(quoteData);
      
      setSubmitResult(result);
      
      if (result.success) {
        // Reset form on success
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
  };

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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p>contact@learntoday.co.kr</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 sm:mt-16 md:mt-0">
            {submitResult ? (
              <div
                className={`rounded-md ${
                  submitResult.success ? 'bg-green-50' : 'bg-red-50'
                } p-4 mb-6`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    {submitResult.success ? (
                      <svg
                        className="h-5 w-5 text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3
                      className={`text-sm font-medium ${
                        submitResult.success ? 'text-green-800' : 'text-red-800'
                      }`}
                    >
                      {submitResult.success ? '제출 완료' : '오류 발생'}
                    </h3>
                    <div
                      className={`mt-2 text-sm ${
                        submitResult.success ? 'text-green-700' : 'text-red-700'
                      }`}
                    >
                      <p>{submitResult.message}</p>
                    </div>
                    {submitResult.success && (
                      <div className="mt-4">
                        <button
                          type="button"
                          className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                          onClick={() => setSubmitResult(null)}
                        >
                          새 문의하기
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
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
