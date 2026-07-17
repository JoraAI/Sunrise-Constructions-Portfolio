import { NextResponse } from 'next/server';

/**
 * GET — Returns whether the Gemini AI is configured.
 * Used by ChatWidget to decide between chat mode and ticket-only mode.
 */
export async function GET() {
  const hasGemini = !!process.env.GEMINI_API_KEY;
  return NextResponse.json({ aiEnabled: hasGemini });
}