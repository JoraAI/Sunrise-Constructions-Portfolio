import { GEMINI_SYSTEM_INSTRUCTION } from './chat-context';

const apiKey = process.env.GEMINI_API_KEY || '';
const MODEL_NAME = 'gemini-3.5-flash';
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

/**
 * Chat history entry format.
 */
export interface GeminiChatTurn {
  role: 'user' | 'model';
  text: string;
}

/**
 * Ask Gemini a question using direct REST API calls (bypassing the SDK
 * to avoid Node.js undici/IPv6 connectivity issues).
 *
 * Returns:
 *   - The model's reply string on success.
 *   - `null` if the API key is missing or the call fails.
 *
 * If the model can't answer from company context, it returns "TICKET_NEEDED".
 */
export async function askGemini(
  history: GeminiChatTurn[],
): Promise<string | null> {
  if (!apiKey) {
    console.warn('[gemini] GEMINI_API_KEY not set - skipping model call');
    return null;
  }

  // Build the contents array for the REST API
  const contents = history.map((turn) => ({
    role: turn.role,
    parts: [{ text: turn.text }],
  }));

  const url = `${API_BASE}/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: GEMINI_SYSTEM_INSTRUCTION }],
        },
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1024,
          topP: 0.9,
          topK: 40,
        },
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[gemini] API returned ${response.status}:`, errText);
      return null;
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;

    return text;
  } catch (error) {
    console.error('[gemini] REST API call failed:', error);
    return null;
  }
}

/**
 * Check whether a Gemini response indicates a ticket should be created.
 */
export function needsTicket(response: string | null): boolean {
  if (!response) return true;
  return response.includes('TICKET_NEEDED');
}