import { createClient } from '@supabase/supabase-js';

// Default to project credentials so Netlify & Vercel deployments fetch Supabase data seamlessly
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://dvqxknpvhstqqlrkxvbt.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2cXhrbnB2aHN0cXFscmt4dmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MjA2OTMsImV4cCI6MjEwMDM5NjY5M30.89s-pYvV76mg1nfhKw5H37KoXVyUeOwoeopn1dO1lt8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
