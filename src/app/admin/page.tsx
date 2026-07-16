'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TicketIcon, ImageIcon, Mail, FileText, TrendingUp, Clock } from 'lucide-react';

interface DashboardStats {
  pendingTickets: number;
  totalMedia: number;
  newsletterSubs: number;
  contactSubmissions: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    pendingTickets: 0,
    totalMedia: 0,
    newsletterSubs: 0,
    contactSubmissions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch {
        // Stats endpoint may not exist yet — show zeros
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const statCards = [
    { label: 'Pending Tickets', value: stats.pendingTickets, icon: TicketIcon, href: '/admin/tickets', color: 'text-amber-600' },
    { label: 'Media Assets', value: stats.totalMedia, icon: ImageIcon, href: '/admin/media', color: 'text-blue-600' },
    { label: 'Newsletter Subs', value: stats.newsletterSubs, icon: Mail, color: 'text-green-600' },
    { label: 'Contact Forms', value: stats.contactSubmissions, icon: FileText, color: 'text-purple-600' },
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-navy">Dashboard</h1>
      <p className="mb-8 text-sm text-gray-500">Overview of your website activity</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href || '#'}
              className="group rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 ${card.color}`}>
                  <Icon className="h-5 w-5" />
                </span>
                {loading ? (
                  <Clock className="h-4 w-4 animate-pulse text-gray-300" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-gray-300 group-hover:text-gray-400" />
                )}
              </div>
              <p className="mt-3 text-3xl font-bold text-navy">
                {loading ? '—' : card.value}
              </p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-navy">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/media"
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:border-gold hover:shadow-sm"
          >
            <ImageIcon className="h-5 w-5 text-gold" />
            <span className="text-sm font-medium text-navy">Upload Media</span>
          </Link>
          <Link
            href="/admin/tickets"
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:border-gold hover:shadow-sm"
          >
            <TicketIcon className="h-5 w-5 text-gold" />
            <span className="text-sm font-medium text-navy">Review Tickets</span>
          </Link>
        </div>
      </div>
    </div>
  );
}