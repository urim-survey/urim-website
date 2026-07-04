import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 브라우저·서버 모두 사용 가능 (NEXT_PUBLIC_ 변수만 사용)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
