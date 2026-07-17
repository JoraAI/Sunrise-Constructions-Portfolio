/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Mail, User, Phone, CheckCircle } from 'lucide-react';
import { chatWidget } from '@/lib/content';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

async function sendMessageToLLM(message: string, history: ChatMessage[]): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      history: history.filter((m) => m.id !== 'greeting').map((m) => ({ role: m.role, content: m.content })),
    }),
  });
  if (!response.ok) throw new Error('Chat API failed');
  const data = await response.json();
  return data.reply || 'Sorry, I could not process your message.';
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [aiEnabled, setAiEnabled] = useState<boolean | null>(null);

  // Check if AI is available on mount
  useEffect(() => {
    fetch('/api/chat/status')
      .then((r) => r.json())
      .then((data) => setAiEnabled(data.aiEnabled))
      .catch(() => setAiEnabled(false));
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          aiEnabled ? (
            <ChatMode onClose={() => setOpen(false)} />
          ) : aiEnabled === false ? (
            <TicketMode onClose={() => setOpen(false)} />
          ) : null
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close' : 'Open chat'}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy shadow-gold-glow transition-colors hover:bg-amber"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

/** Full AI chat mode */
function ChatMode({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'greeting', role: 'assistant', content: chatWidget.greeting },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isTyping]);
  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 200); }, []);

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', content: trimmed }]);
    setInput(''); setIsTyping(true);
    try {
      const reply = await sendMessageToLLM(trimmed, messages);
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: 'assistant', content: 'Sorry, something went wrong. Email us at hello@sunriseconstructions.in.' }]);
    } finally { setIsTyping(false); }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="mb-3 flex h-[30rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-navy-lg"
      role="dialog" aria-label={chatWidget.title}
    >
      <div className="flex items-center justify-between bg-navy px-4 py-3.5 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20"><Bot className="h-5 w-5 text-gold" /></span>
          <div>
            <p className="text-sm font-semibold">{chatWidget.title}</p>
            <p className="flex items-center gap-1.5 text-xs text-white/60"><span className="h-1.5 w-1.5 rounded-full bg-green-400" />{chatWidget.subtitle}</p>
          </div>
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-white/70 hover:bg-white/10"><X className="h-5 w-5" /></button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-cream/40 px-4 py-4">
        {messages.map((msg) => (
          <div key={msg.id} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div className={cn('max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm', msg.role === 'user' ? 'rounded-br-sm bg-gold text-navy' : 'rounded-bl-sm bg-white text-charcoal shadow-sm')}>{msg.content}</div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start"><div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm">
            <span className="h-2 w-2 animate-bounce rounded-full bg-charcoal-muted [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-charcoal-muted [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-charcoal-muted" />
          </div></div>
        )}
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-navy/10 bg-white px-3 py-3">
        <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={chatWidget.placeholder}
          className="flex-1 rounded-xl border border-navy/10 bg-cream/50 px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-muted/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20" aria-label="Message" />
        <button type="submit" disabled={!input.trim() || isTyping} aria-label="Send" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold text-navy hover:bg-amber disabled:opacity-50"><Send className="h-4 w-4" /></button>
      </form>
      <p className="bg-white px-4 pb-2 text-center text-[0.65rem] text-charcoal-muted/70">{chatWidget.disclaimer}</p>
    </motion.div>
  );
}

/** Ticket-only mode (when AI is not configured) */
function TicketMode({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !message.trim()) { setError('Email and message are required'); return; }
    setSubmitting(true); setError('');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.trim(), visitorName: name.trim(), visitorEmail: email.trim(), visitorPhone: phone.trim() }),
      });
      if (res.ok) { setSubmitted(true); } else { setError('Failed to submit. Please try again.'); }
    } catch { setError('Network error. Please try again.'); }
    setSubmitting(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="mb-3 flex h-[30rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-navy-lg"
      role="dialog" aria-label="Contact form"
    >
      <div className="flex items-center justify-between bg-navy px-4 py-3.5 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20"><Mail className="h-5 w-5 text-gold" /></span>
          <div>
            <p className="text-sm font-semibold">Send us a message</p>
            <p className="text-xs text-white/60">We'll get back to you soon</p>
          </div>
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-white/70 hover:bg-white/10"><X className="h-5 w-5" /></button>
      </div>

      {submitted ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-500" />
          <p className="mt-4 text-sm font-medium text-navy">Thank you!</p>
          <p className="mt-1 text-xs text-gray-500">Your message has been sent. Our team will get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-3 overflow-y-auto bg-cream/40 px-4 py-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Email *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Optional"
                className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20" />
            </div>
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-gray-600">Message *</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={3} placeholder="How can we help?"
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20" />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button type="submit" disabled={submitting}
            className="flex items-center justify-center gap-2 rounded-xl bg-gold py-2.5 text-sm font-semibold text-navy hover:bg-amber disabled:opacity-50">
            {submitting ? 'Sending...' : 'Send Message'}
            {!submitting && <Send className="h-3.5 w-3.5" />}
          </button>
        </form>
      )}
    </motion.div>
  );
}