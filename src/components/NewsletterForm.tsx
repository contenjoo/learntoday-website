"use client";
import { useState, FormEvent } from 'react';

export default function NewsletterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('이메일을 입력해주세요.');
      return;
    }
    
    setStatus('loading');
    
    try {
      // SendFox form submission
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // Create a hidden iframe for submission
      const iframe = document.createElement('iframe');
      iframe.name = 'sendfox-iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Set form target to the iframe
      form.target = 'sendfox-iframe';
      form.submit();
      
      // Set success after submission
      setStatus('success');
      setMessage('뉴스레터 구독이 완료되었습니다!');
      setName('');
      setEmail('');
      
      // Remove iframe after a delay
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    } catch (error) {
      setStatus('error');
      setMessage('구독 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('Newsletter subscription error:', error);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-sm font-medium text-gray-900 mb-2 sm:mb-4">뉴스레터 구독</h3>
      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">최신 교육 기술 및 AI 트렌드 소식을 받아보세요.</p>
      
      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-2 sm:p-3 mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm text-green-700">{message}</p>
        </div>
      ) : status === 'error' ? (
        <div className="bg-red-50 border border-red-200 rounded-md p-2 sm:p-3 mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm text-red-700">{message}</p>
        </div>
      ) : null}
      
      <form 
        method="post" 
        action="https://sendfox.com/form/1x9pr9/1dnprk" 
        className="sendfox-form space-y-3" 
        id="1dnprk" 
        data-async="true" 
        data-recaptcha="false"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="sendfox_form_name" className="block text-xs sm:text-sm text-gray-600 mb-1">이름</label>
          <input 
            type="text" 
            id="sendfox_form_name" 
            name="contact_fields[]" 
            placeholder="이름" 
            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="sendfox_form_email" className="block text-xs sm:text-sm text-gray-600 mb-1">이메일 <span className="text-red-500">*</span></label>
          <input 
            type="email" 
            id="sendfox_form_email" 
            name="email" 
            placeholder="your@email.com" 
            required 
            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        {/* Hidden field for anti-spam */}
        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
          <input type="text" name="a_password" tabIndex={-1} defaultValue="" autoComplete="off" />
        </div>
        
        <div>
          <button 
            type="submit" 
            className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-md text-xs sm:text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${status === 'loading' ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? '처리 중...' : '구독하기'}
          </button>
        </div>
      </form>
      
      {/* Load SendFox script */}
      <script src="https://cdn.sendfox.com/js/form.js" charSet="utf-8" defer />
    </div>
  );
}
