import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
console.log(" connecting to supabase with url: ", supabaseUrl);

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase  = createClient(supabaseUrl, supabaseAnonKey, );

export default supabase;