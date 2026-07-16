'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  TicketIcon,
  ImageIcon,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrentUser } from '@/lib/use-current-user';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useCurrentUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't render the admin shell on the login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Build nav based on role
  const navItems: { label: string; href: string; icon: typeof LayoutDashboard }[] = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Tickets', href: '/admin/tickets', icon: TicketIcon },
    { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
  ];

  // Super admin only items
  if (user?.role === 'super_admin') {
    navItems.push({ label: 'User Management', href: '/admin/users', icon: Users });
  }

  navItems.push({ label: 'Settings', href: '/admin/settings', icon: Settings });

  // Content management links (both roles)
  const contentItems = [
    { label: 'Projects', href: '/admin/content/projects' },
    { label: 'Services', href: '/admin/content/services' },
    { label: 'Industries', href: '/admin/content/industries' },
    { label: 'Team', href: '/admin/content/team' },
    { label: 'Testimonials', href: '/admin/content/testimonials' },
    { label: 'Blog Posts', href: '/admin/content/blog' },
    { label: 'Job Listings', href: '/admin/content/jobs' },
  ];

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="flex items-center gap-2 font-semibold text-navy">
          <Building2 className="h-5 w-5 text-gold" />
          Admin
        </span>
      </div>

      {/* Sidebar (desktop) */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-gray-200 bg-white lg:flex">
        <AdminSidebar
          navItems={navItems}
          contentItems={contentItems}
          pathname={pathname}
          user={user}
          loading={loading}
          onLogout={handleLogout}
        />
      </aside>

      {/* Sidebar (mobile drawer) */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-navy/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white lg:hidden"
          >
            <div className="flex justify-end p-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg p-1.5 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <AdminSidebar
              navItems={navItems}
              contentItems={contentItems}
              pathname={pathname}
              user={user}
              loading={loading}
              onLogout={handleLogout}
            />
          </motion.aside>
        </>
      )}

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function AdminSidebar({
  navItems,
  contentItems,
  pathname,
  user,
  loading,
  onLogout,
}: {
  navItems: { label: string; href: string; icon: typeof LayoutDashboard }[];
  contentItems: { label: string; href: string }[];
  pathname: string;
  user: { email: string; role: string } | null;
  loading: boolean;
  onLogout: () => void;
}) {
  return (
    <>
      {/* Logo */}
      <div className="border-b border-gray-200 px-5 py-4">
        <Link href="/admin" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-white">
            <Building2 className="h-5 w-5 text-gold" />
          </span>
          <div>
            <p className="text-sm font-bold text-navy">Sunrise Admin</p>
            <p className="text-xs text-gray-400">Control Panel</p>
          </div>
        </Link>
      </div>

      {/* User badge */}
      <div className="border-b border-gray-200 px-5 py-3">
        {loading ? (
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        ) : user ? (
          <div>
            <p className="truncate text-xs font-medium text-navy">{user.email}</p>
            <span
              className={cn(
                'mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase',
                user.role === 'super_admin'
                  ? 'bg-gold/15 text-gold'
                  : 'bg-blue-50 text-blue-600',
              )}
            >
              {user.role === 'super_admin' ? '★ Super Admin' : 'Admin'}
            </span>
          </div>
        ) : null}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-navy text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-navy',
              )}
            >
              <Icon className={cn('h-4 w-4', active ? 'text-gold' : '')} />
              {item.label}
            </Link>
          );
        })}

        {/* Content Management Section */}
        <div className="pt-4">
          <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Content Management
          </p>
          {contentItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors',
                  active
                    ? 'bg-navy text-white'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-navy',
                )}
              >
                <span className="ml-1 h-1 w-1 rounded-full bg-current opacity-40" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer actions */}
      <div className="space-y-1 border-t border-gray-200 px-3 py-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-navy"
        >
          <ExternalLink className="h-4 w-4" />
          View Website
        </a>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </>
  );
}