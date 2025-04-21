"use client";
import { useState } from "react";

export default function ClientContactPage() {

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
          {/* 왼쪽 영역 */}
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">견적 문의</h2>
            <p className="mt-3 text-lg text-gray-500">
              주식회사 오늘배움의 AI 기반 교육 솔루션에 관심을 가져주셔서 감사합니다.<br />
              아래 버튼을 클릭하시면 견적 문의 폼이 오른쪽에 바로 표시됩니다.
            </p>
            <div className="mt-9">
              <div className="mt-8 p-4 rounded-lg border border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">회사 정보</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li><span className="font-medium">사업자등록번호:</span> 313-86-02193</li>
                  <li><span className="font-medium">이메일:</span> contenjoo@learntoday.co.kr</li>
                  <li><span className="font-medium">주소(본사):</span> 대전광역시 유성구 지족로351 402호</li>
                  <li><span className="font-medium">주소(이노베이션센터):</span> 대전광역시 서구 만년로68번길 15-20 6층 613호</li>
                  <li><span className="font-medium">전화:</span> 0507-1316-1571</li>
                </ul>
              </div>

            </div>

          </div>
          {/* 오른쪽 영역: 카드형 문의 폼 */}
          <div className="mt-12 md:mt-0 flex items-start justify-center">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 text-center">맞춤 견적 문의</h2>
              <p className="text-gray-600 text-center mb-6">
                주식회사 오늘배움의 AI 기반 교육 솔루션에 관심을 가져주셔서 감사합니다.<br />
                아래 양식을 작성하시면 담당자가 빠르게 연락드리겠습니다.
              </p>
              <iframe
                className="airtable-embed rounded-xl border border-gray-200"
                src="https://airtable.com/embed/appnhPWwfx1nd35tg/pageG73CLVY72AUXr/form"
                frameBorder="0"
                width="100%"
                height="600"
                style={{ background: 'transparent', borderRadius: '1rem', minWidth: 340, maxWidth: 600 }}
                title="Airtable 견적 문의"
                allow="camera; microphone;"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
