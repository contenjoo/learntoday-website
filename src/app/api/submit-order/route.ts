import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

// Airtable API 토큰 및 베이스 ID
const AIRTABLE_PERSONAL_ACCESS_TOKEN = 'patAyhGbJFTVsTTkf.6da6ef653137d7e483aa9f743ff517ef79e090dfba8e8f86ddbd266a4ea18c71'; // 실제 Airtable Personal Access Token 사용
const AIRTABLE_BASE_ID = 'appnhPWwfx1nd35tg';
const AIRTABLE_TABLE_NAME = 'tblUmqoOAay60aQ75'; // 실제 Airtable 테이블 ID 사용
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

export async function POST(request: Request) {
  try {
    // 요청 본문 파싱
    const body = await request.json();
    console.log('Request body received:', body);
    const { customerInfo, orderItems, orderItemsString, totalAmount } = body;

    // 주문 정보 유효성 검사
    if (!customerInfo || !orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return NextResponse.json(
        { error: '유효하지 않은 주문 정보입니다.' },
        { status: 400 }
      );
    }

    // Airtable API 요청 헤더 (API 키 방식 사용)
    const headers = {
      'Authorization': `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };

    // 주문 정보 포맷팅 - Airtable 필드에 맞게 구성
    const record = {
      fields: {
        'SchoolName': customerInfo.school,
        'ContactName': customerInfo.name,
        'PhoneNumber': customerInfo.phone,
        'Email': customerInfo.email,
        'AdditionalInfo': customerInfo.additionalInfo || '',
        'OrderItems': orderItemsString || orderItems.map(item => `${item.product || item.name} ${item.plan ? `(${item.plan})` : ''} x${item.quantity}`).join(', '),
        'TotalAmount': totalAmount,
        'OrderDate': new Date().toISOString()
      }
    };
    
    const records = [record];

    // Airtable API 호출 전 데이터 로깅
    console.log('Sending to Airtable:', { 
      url: AIRTABLE_API_URL, 
      headers: { ...headers, 'Authorization': 'Bearer [REDACTED]' }, // 토큰 가리기
      records 
    });
    
    try {
      // API 키 사용 (이전 방식)
      const response = await fetch(AIRTABLE_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ records }),
      });
      
      // 응답 상태 코드 로깅
      console.log(`Airtable API response status: ${response.status} ${response.statusText}`);
      
      // 응답 헤더 로깅
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });
      console.log('Airtable API response headers:', responseHeaders);
    
      // 응답 처리
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Airtable API error response text:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
          console.error('Airtable API error parsed:', errorData);
        } catch (e) {
          console.error('Failed to parse Airtable error response:', e);
          errorData = { text: errorText };
        }
        
        // 에러 코드에 따른 다른 에러 메시지
        let errorMessage = 'Airtable API 오류가 발생했습니다.';
        
        if (response.status === 401 || response.status === 403) {
          errorMessage = 'Airtable 인증 오류: 토큰이 유효하지 않거나 권한이 부족합니다.';
        } else if (response.status === 422) {
          errorMessage = 'Airtable 데이터 검증 오류: 필드 이름이나 데이터 형식이 올바르지 않습니다.';
        } else if (response.status === 429) {
          errorMessage = 'Airtable API 요청 한도 초과: 잠시 후 다시 시도해주세요.';
        } else if (response.status >= 500) {
          errorMessage = 'Airtable 서버 오류: 잠시 후 다시 시도해주세요.';
        }
        
        return NextResponse.json(
          { 
            error: errorMessage, 
            details: errorData,
            status: response.status,
            statusText: response.statusText
          },
          { status: 500 }
        );
      }
    
      // 성공 응답 처리
      const responseText = await response.text();
      console.log('Airtable API success response:', responseText);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse Airtable success response:', e);
        result = { text: responseText };
      }
      
      console.log('Airtable API success parsed:', result);
      
      // Supabase에도 주문 데이터 저장
      try {
        console.log('테스트 주문: Supabase에 주문 데이터 저장 시도');
        
        // 주문 번호 생성 (YYYYMMDD-XXXX 형식)
        const now = new Date();
        const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
        const randomNum = Math.floor(1000 + Math.random() * 9000); // 1000-9999 사이의 랜덤 숫자
        const orderNumber = `${dateStr}-${randomNum}`;
        
        // 사용자 정보 확인
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        console.log('테스트 주문: 사용자 세션 정보:', { 
          hasSession: !!sessionData?.session,
          userId: userId || 'null',
          userEmail: sessionData?.session?.user?.email || 'null'
        });
        
        // 주문 데이터 저장 전 로그
        const orderData = {
          order_number: orderNumber,
          user_id: userId || null,
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
          customer_school: customerInfo.school,
          additional_info: customerInfo.additionalInfo || '',
          items: orderItems,
          total_amount: totalAmount,
          status: 'completed',
          created_at: now.toISOString()
        };
        console.log('테스트 주문: Supabase에 저장할 데이터:', orderData);
        
        // 주문 데이터 저장
        const { data: insertedData, error: orderError } = await supabase
          .from('orders')
          .insert(orderData)
          .select();
        
        if (orderError) {
          console.error('테스트 주문: Supabase orders 테이블 저장 오류:', orderError);
          console.error('테스트 주문: 오류 상세 정보:', {
            code: orderError.code,
            message: orderError.message,
            details: orderError.details,
            hint: orderError.hint
          });
          // Supabase 오류가 발생해도 Airtable 저장은 성공했으니 성공 응답 반환
        } else {
          console.log('테스트 주문: Supabase 저장 성공:', insertedData);
        }
        
        return NextResponse.json({
          success: true,
          message: '주문이 성공적으로 접수되었습니다.',
          data: result,
          orderNumber: orderNumber
        });
      } catch (supabaseError) {
        console.error('Supabase 저장 오류:', supabaseError);
        // Supabase 오류가 발생해도 Airtable 저장은 성공했으니 성공 응답 반환
        return NextResponse.json({
          success: true,
          message: '주문이 성공적으로 접수되었습니다.',
          data: result
        });
      }
    } catch (fetchError: any) {
      console.error('Airtable fetch error:', {
        error: fetchError,
        message: fetchError instanceof Error ? fetchError.message : String(fetchError),
        code: fetchError.code
      });
      
      // 네트워크 오류 메시지 추출
      let errorMessage = 'Airtable API 호출 중 오류가 발생했습니다.';
      
      if (fetchError.code === 'ECONNREFUSED') {
        errorMessage = 'Airtable 서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.';
      } else if (fetchError.code === 'ETIMEDOUT') {
        errorMessage = 'Airtable 서버 연결 시간이 초과되었습니다.';
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: fetchError instanceof Error ? fetchError.message : String(fetchError),
          code: fetchError.code,
          success: false
        },
        { status: 500 }
      );
    }
    
  } catch (error: any) {
    // 상세 에러 정보 및 요청 데이터까지 로깅
    console.error('Detailed order submission error:', {
      error,
      message: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : null,
      name: error instanceof Error ? error.name : 'Unknown',
      code: error.code, // 네트워크 오류 코드 (ECONNREFUSED 등)
      cause: error.cause, // 원인 오류
    });

    // 네트워크 오류 메시지 추출
    let errorMessage = '주문 처리 중 오류가 발생했습니다. 다시 시도해주세요.';
    
    if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Airtable 서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Airtable 서버 연결 시간이 초과되었습니다. 다시 시도해주세요.';
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: error instanceof Error ? error.message : error,
        code: error.code,
        name: error instanceof Error ? error.name : 'Unknown',
        stack: error instanceof Error ? error.stack : null,
        success: false
      },
      { status: 500 }
    );
  }
}
