'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { MessageSquare, Mail, Phone, Loader2 } from 'lucide-react';

interface Ticket {
  id: string;
  visitor_name: string | null;
  visitor_email: string | null;
  visitor_phone: string | null;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'resolved'>('all');

  useEffect(() => {
    fetchTickets();
  }, []);

  async function fetchTickets() {
    setLoading(true);
    const { data } = await supabase.from('chat_tickets').select('*').order('created_at', { ascending: false });
    if (data) setTickets(data);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('chat_tickets').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
    fetchTickets();
  }

  const filtered = filter === 'all' ? tickets : tickets.filter((t) => t.status === filter);

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    in_progress: 'bg-blue-100 text-blue-700',
    resolved: 'bg-green-100 text-green-700',
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-navy">Support Tickets</h1>
            <p className="text-sm text-gray-500">Chat messages from website visitors</p>
          </div>
          <div className="flex gap-2">
            {(['all', 'pending', 'in_progress', 'resolved'] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${filter === f ? 'bg-navy text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
                {f === 'all' ? 'All' : f.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-navy" /></div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center"><MessageSquare className="mx-auto h-12 w-12 text-gray-300" /><p className="mt-4 text-gray-500">No tickets found</p></div>
        ) : (
          <div className="space-y-4">
            {filtered.map((ticket) => (
              <div key={ticket.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusColors[ticket.status]}`}>{ticket.status.replace('_', ' ')}</span>
                      <span className="text-xs text-gray-400">{new Date(ticket.created_at).toLocaleString('en-IN')}</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-700">{ticket.message}</p>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                      {ticket.visitor_name && <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> {ticket.visitor_name}</span>}
                      {ticket.visitor_email && <a href={`mailto:${ticket.visitor_email}`} className="flex items-center gap-1 text-blue-600 hover:underline"><Mail className="h-3.5 w-3.5" /> {ticket.visitor_email}</a>}
                      {ticket.visitor_phone && <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {ticket.visitor_phone}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <select value={ticket.status} onChange={(e) => updateStatus(ticket.id, e.target.value)} className="rounded-lg border border-gray-200 px-2 py-1 text-xs font-semibold">
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    {ticket.visitor_email && <a href={`mailto:${ticket.visitor_email}`} className="rounded-lg bg-navy px-3 py-1.5 text-center text-xs font-semibold text-white hover:bg-navy-600">Reply</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}