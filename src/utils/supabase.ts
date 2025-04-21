import { createClient } from '@supabase/supabase-js';

// These environment variables must be set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!supabaseUrl) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined');

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseAnonKey) throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined');

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types based on the database schema
export type User = {
  id: string;
  email: string;
  name: string;
  school_name: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
};

export type ProductPlan = {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  price_info: ProductPlan[];
  image_url: string;
  created_at: string;
  updated_at: string;
};
