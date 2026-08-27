import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { askGemini, needsTicket, type GeminiChatTurn } from '@/lib/gemini';
import { chatTicketEmailHtml, sendStaffEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * Creates a support ticket in Supabase and sends email notification to staff.
 * Called when Gemini can't answer (out of scope) or when API key is missing.
 */
async function createTicketAndNotify(
  message: string,
  visitorName?: string,
  visitorEmail?: string,
  visitorPhone?: string,
) {
  let ticketId: string | undefined;

  if (supabaseUrl && supabaseServiceKey) {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data, error: dbError } = await supabase
      .from('chat_tickets')
      .insert({
        message,
        visitor_name: visitorName || null,
        visitor_email: visitorEmail || null,
        visitor_phone: visitorPhone || null,
        status: 'pending',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Supabase error:', dbError);
    } else {
      ticketId = data?.id;
    }
  }

  const emailResult = await sendStaffEmail({
    subject: `New Chat Message from Website${visitorName ? ` - ${visitorName}` : ''}`,
    replyTo: visitorEmail,
    html: chatTicketEmailHtml({
      message,
      visitorName,
      visitorEmail,
      visitorPhone,
      ticketId,
    }),
  });

  return { ticketId, emailResult };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, visitorName, visitorEmail, visitorPhone, history } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const geminiHistory: GeminiChatTurn[] = Array.isArray(history)
      ? history.map(
          (h: { role: string; content: string }): GeminiChatTurn => ({
            role: h.role === 'user' ? 'user' : 'model',
            text: h.content,
          }),
        )
      : [];

    const fullHistory: GeminiChatTurn[] = [
      ...geminiHistory,
      { role: 'user', text: message },
    ];

    const aiResponse = await askGemini(fullHistory);

    if (aiResponse && !needsTicket(aiResponse)) {
      return NextResponse.json({
        reply: aiResponse,
        source: 'ai',
        ticketCreated: false,
      });
    }

    const { ticketId, emailResult } = await createTicketAndNotify(
      message,
      visitorName,
      visitorEmail,
      visitorPhone,
    );

    const fallbackReply =
      "Thank you for reaching out! I've forwarded your message to our team and they'll get back to you soon. For urgent enquiries, please email info@sunrisegroupltd.in.";

    return NextResponse.json({
      reply: fallbackReply,
      source: 'ticket',
      ticketCreated: true,
      ticketId,
      emailed: emailResult.ok,
      emailError: emailResult.ok ? undefined : emailResult.error,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 },
    );
  }
}
