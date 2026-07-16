import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const placeholder = 'https://placeholder.supabase.co';
const placeholderKey = 'placeholder-key';

// Browser-side client (uses anon key, respects RLS)
export const supabase: SupabaseClient =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (createClient(placeholder, placeholderKey) as SupabaseClient);

/**
 * Server-side admin client (uses service role key, bypasses RLS).
 * Use ONLY in API routes / server components — never expose to client.
 */
export function getServerSupabase(): SupabaseClient {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!supabaseUrl || !serviceKey) {
    return createClient(placeholder, placeholderKey) as SupabaseClient;
  }
  return createClient(supabaseUrl, serviceKey);
}