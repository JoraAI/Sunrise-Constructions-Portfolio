import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { askGemini, needsTicket, type GeminiChatTurn } from '@/lib/gemini';
import { escapeHtml, sendStaffEmail } from '@/lib/email';

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

  // 1. Store ticket in Supabase
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

  // 2. Send email notification to staff via Resend
  await sendStaffEmail({
    subject: `New Chat Message from Website${visitorName ? ` - ${visitorName}` : ''}`,
    replyTo: visitorEmail,
    html: `
      <h2>New Support Request from Website Chat</h2>
      <p><strong>From:</strong> ${escapeHtml(visitorName || 'Anonymous')}</p>
      <p><strong>Email:</strong> ${escapeHtml(visitorEmail || 'Not provided')}</p>
      <p><strong>Phone:</strong> ${escapeHtml(visitorPhone || 'Not provided')}</p>
      <p><strong>Message:</strong></p>
      <blockquote>${escapeHtml(message)}</blockquote>
      <p><strong>Ticket ID:</strong> ${escapeHtml(ticketId || 'N/A')}</p>
      <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      <hr>
      <p><em>Reply directly to this visitor's email to respond.</em></p>
    `,
  });

  return ticketId;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, visitorName, visitorEmail, visitorPhone, history } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Build Gemini chat history from the client-provided conversation
    const geminiHistory: GeminiChatTurn[] = Array.isArray(history)
      ? history.map(
          (h: { role: string; content: string }): GeminiChatTurn => ({
            role: h.role === 'user' ? 'user' : 'model',
            text: h.content,
          }),
        )
      : [];

    // Ensure the latest user message is in history
    const fullHistory: GeminiChatTurn[] = [
      ...geminiHistory,
      { role: 'user', text: message },
    ];

    // 1. Try answering with Gemini
    const aiResponse = await askGemini(fullHistory);

    // 2. If Gemini answered successfully, return it to the user
    if (aiResponse && !needsTicket(aiResponse)) {
      return NextResponse.json({
        reply: aiResponse,
        source: 'ai',
        ticketCreated: false,
      });
    }

    // 3. Gemini couldn't answer (or key missing) - create a ticket + notify staff
    const ticketId = await createTicketAndNotify(
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
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 },
    );
  }
}