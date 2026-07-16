'use client';

import { useEffect, useState } from 'react';

export interface CurrentUser {
  email: string;
  role: 'admin' | 'super_admin';
}

/**
 * Hook to get the current logged-in admin user's info.
 * Returns null while loading, or if not authenticated.
 */
export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/admin/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch {
        // Not authenticated
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return { user, loading };
}