import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export async function GET() {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const [ticketsRes, mediaRes, newsletterRes, contactRes] = await Promise.all([
    supabase.from('chat_tickets').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('media_assets').select('*', { count: 'exact', head: true }),
    supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
  ]);

  return NextResponse.json({
    pendingTickets: ticketsRes.count || 0,
    totalMedia: mediaRes.count || 0,
    newsletterSubs: newsletterRes.count || 0,
    contactSubmissions: contactRes.count || 0,
  });
}