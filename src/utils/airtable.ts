import Airtable from 'airtable';

// These environment variables are set in .env.local
const airtableApiKey = process.env.AIRTABLE_API_KEY || 'patAyhGbJFTVsTTkf';
const airtableBaseId = process.env.AIRTABLE_BASE_ID || 'appnhPWwfx1nd35tg';

// Initialize Airtable
Airtable.configure({
  apiKey: airtableApiKey,
});

const base = Airtable.base(airtableBaseId);

// Quote type based on the Airtable schema
export type Quote = {
  SchoolName: string;
  ContactName: string;
  PhoneNumber: string;
  Email: string;
  AdditionalInfo?: string;
  OrderItems: string;
  TotalAmount?: number;
  OrderDate: string;
};

// Function to submit a quote request to Airtable
export async function submitQuote(quoteData: Quote): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    const record = await base('quotes').create({
      SchoolName: quoteData.SchoolName,
      ContactName: quoteData.ContactName,
      PhoneNumber: quoteData.PhoneNumber,
      Email: quoteData.Email,
      AdditionalInfo: quoteData.AdditionalInfo || '',
      OrderItems: quoteData.OrderItems,
      TotalAmount: quoteData.TotalAmount || 0,
      OrderDate: quoteData.OrderDate,
    });

    return {
      success: true,
      message: '견적 문의가 성공적으로 제출되었습니다.',
      id: record.getId(),
    };
  } catch (error) {
    console.error('Error submitting quote to Airtable:', error);
    return {
      success: false,
      message: '견적 문의 제출 중 오류가 발생했습니다. 나중에 다시 시도해주세요.',
    };
  }
}
