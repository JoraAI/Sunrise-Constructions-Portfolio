'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { chatWidget } from '@/lib/content';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

/**
 * ============================================================================
 * LLM INTEGRATION STUB
 * ============================================================================
 * Replace the body of this function with a real API call (e.g. fetch to
 * /api/chat) when wiring up a live assistant. The UI and local state are
 * built to work unchanged once this returns a real response string.
 * ============================================================================
 */
async function sendMessageToLLM(message: string): Promise<string> {
  // Simulated network + model latency so the typing indicator is visible.
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Naive canned responses - swap for real model output later.
  const lower = message.toLowerCase();
  if (lower.includes('service') || lower.includes('what do you')) {
    return 'We offer General Construction, Project Management, Design & Build, Renovation & Remodeling, and Sustainable Construction. You can explore them all at /services - or tell me about your project and I\u2019ll suggest the best fit.';
  }
  if (lower.includes('quote') || lower.includes('price') || lower.includes('cost')) {
    return 'I\u2019d be happy to connect you with our estimating team. Could you share the project type, location, and approximate scope? Or submit details via our /contact-us page for a formal quote.';
  }
  if (lower.includes('career') || lower.includes('job') || lower.includes('hiring')) {
    return 'We\u2019re always looking for great engineers and project leaders. Check our open roles at /careers - we\u2019d love to hear from you.';
  }
  return 'Thanks for reaching out to Sunrise Constructions! A team member will follow up shortly. For anything urgent, call +91 712 4567 890 or email hello@sunriseconstructions.in.';
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'greeting', role: 'assistant', content: chatWidget.greeting },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages / typing indicator
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const reply = await sendMessageToLLM(trimmed);
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: 'assistant', content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content:
            'Sorry, something went wrong. Please try again or reach us at hello@sunriseconstructions.in.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 flex h-[30rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-navy-lg"
            role="dialog"
            aria-label={chatWidget.title}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-navy px-4 py-3.5 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20">
                  <Bot className="h-5 w-5 text-gold" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{chatWidget.title}</p>
                  <p className="flex items-center gap-1.5 text-xs text-white/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    {chatWidget.subtitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-cream/40 px-4 py-4"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm',
                      msg.role === 'user'
                        ? 'rounded-br-sm bg-gold text-navy'
                        : 'rounded-bl-sm bg-white text-charcoal shadow-sm',
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-charcoal-muted [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-charcoal-muted [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-charcoal-muted" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 border-t border-navy/10 bg-white px-3 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={chatWidget.placeholder}
                className="flex-1 rounded-xl border border-navy/10 bg-cream/50 px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-muted/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                aria-label="Type your message"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold text-navy transition-colors hover:bg-amber disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="bg-white px-4 pb-2 text-center text-[0.65rem] text-charcoal-muted/70">
              {chatWidget.disclaimer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher bubble */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy shadow-gold-glow transition-colors hover:bg-amber"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}