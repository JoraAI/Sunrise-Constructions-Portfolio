'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Pencil,
  Loader2,
  X,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface ContentItem {
  id: string;
  [key: string]: unknown;
}

// Field configurations for each content type
const FIELD_CONFIGS: Record<string, { label: string; urlPrefix?: string; titleField: string; subtitleField?: string; fields: { name: string; label: string; type: 'text' | 'textarea' | 'number' | 'boolean' | 'json-array'; required?: boolean; placeholder?: string }[] }> = {
  projects: {
    label: 'Projects',
    urlPrefix: '/projects',
    titleField: 'title',
    subtitleField: 'location',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug (URL)', type: 'text', required: true, placeholder: 'kanhan-major-bridge' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'year', label: 'Year', type: 'text' },
      { name: 'client', label: 'Client', type: 'text' },
      { name: 'metric', label: 'Metric (e.g. ₹7.31 Cr)', type: 'text' },
      { name: 'image', label: 'Image Path', type: 'text', placeholder: '/images/projects/...' },
      { name: 'alt', label: 'Image Alt Text', type: 'text' },
      { name: 'featured', label: 'Featured on Homepage', type: 'boolean' },
      { name: 'summary', label: 'Summary', type: 'textarea' },
      { name: 'overview', label: 'Overview', type: 'textarea' },
      { name: 'scope', label: 'Scope Items (one per line)', type: 'json-array' },
    ],
  },
  services: {
    label: 'Services',
    urlPrefix: '/services',
    titleField: 'title',
    subtitleField: 'short_description',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug (URL)', type: 'text', required: true },
      { name: 'short_description', label: 'Short Description', type: 'textarea' },
      { name: 'icon', label: 'Icon Name', type: 'text' },
      { name: 'image', label: 'Image Path', type: 'text' },
      { name: 'alt', label: 'Image Alt Text', type: 'text' },
      { name: 'overview', label: 'Overview', type: 'textarea' },
      { name: 'key_deliverables', label: 'Key Deliverables (one per line)', type: 'json-array' },
      { name: 'process', label: 'Process Steps (one per line)', type: 'json-array' },
    ],
  },
  industries: {
    label: 'Industries',
    urlPrefix: '/industries',
    titleField: 'title',
    subtitleField: 'short_description',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug (URL)', type: 'text', required: true },
      { name: 'short_description', label: 'Short Description', type: 'textarea' },
      { name: 'icon', label: 'Icon Name', type: 'text' },
      { name: 'image', label: 'Image Path', type: 'text' },
      { name: 'overview', label: 'Overview', type: 'textarea' },
      { name: 'capabilities', label: 'Capabilities (one per line)', type: 'json-array' },
    ],
  },
  team: {
    label: 'Team',
    titleField: 'name',
    subtitleField: 'title',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'title', label: 'Title/Role', type: 'text', required: true },
      { name: 'bio', label: 'Bio', type: 'textarea' },
      { name: 'image', label: 'Image Path', type: 'text' },
      { name: 'alt', label: 'Image Alt Text', type: 'text' },
      { name: 'linkedin', label: 'LinkedIn URL', type: 'text' },
    ],
  },
  testimonials: {
    label: 'Testimonials',
    titleField: 'name',
    subtitleField: 'company',
    fields: [
      { name: 'quote', label: 'Quote', type: 'textarea', required: true },
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text' },
      { name: 'company', label: 'Company', type: 'text' },
      { name: 'project', label: 'Project', type: 'text' },
      { name: 'rating', label: 'Rating (1-5)', type: 'number' },
      { name: 'image', label: 'Image Path', type: 'text' },
    ],
  },
  blog: {
    label: 'Blog Posts',
    urlPrefix: '/blog',
    titleField: 'title',
    subtitleField: 'category',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug (URL)', type: 'text', required: true },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'author', label: 'Author', type: 'text' },
      { name: 'author_role', label: 'Author Role', type: 'text' },
      { name: 'date', label: 'Date', type: 'text', placeholder: 'YYYY-MM-DD' },
      { name: 'reading_time', label: 'Reading Time', type: 'text' },
      { name: 'image', label: 'Image Path', type: 'text' },
      { name: 'published', label: 'Published', type: 'boolean' },
      { name: 'content', label: 'Content Paragraphs (one per line)', type: 'json-array' },
    ],
  },
  jobs: {
    label: 'Job Listings',
    urlPrefix: '/careers',
    titleField: 'title',
    subtitleField: 'department',
    fields: [
      { name: 'title', label: 'Job Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug (URL)', type: 'text', required: true },
      { name: 'department', label: 'Department', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'employment_type', label: 'Employment Type', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'responsibilities', label: 'Responsibilities (one per line)', type: 'json-array' },
      { name: 'requirements', label: 'Requirements (one per line)', type: 'json-array' },
      { name: 'qualifications', label: 'Qualifications (one per line)', type: 'json-array' },
      { name: 'active', label: 'Active', type: 'boolean' },
    ],
  },
};

export default function ContentManagementPage() {
  const params = useParams();
  const contentType = params.type as string;
  const config = FIELD_CONFIGS[contentType];

  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [creating, setCreating] = useState(false);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/content/${contentType}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [contentType]);

  useEffect(() => {
    if (config) loadItems();
  }, [config, loadItems]);

  if (!config) {
    return (
      <div className="py-20 text-center">
        <AlertCircle className="mx-auto mb-3 h-10 w-10 text-gray-300" />
        <p className="text-gray-500">Unknown content type: {contentType}</p>
      </div>
    );
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/content/${contentType}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">{config.label}</h1>
          <p className="text-sm text-gray-500">
            {items.length} {config.label.toLowerCase()}
            {config.urlPrefix && ' · URLs at ' + config.urlPrefix + '/[slug]'}
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy/90"
        >
          <Plus className="h-4 w-4" />
          Add {config.label.replace(/s$/, '')}
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-20 text-center">
          <p className="text-gray-500">No {config.label.toLowerCase()} yet</p>
          <button
            onClick={() => setCreating(true)}
            className="mt-4 text-sm font-medium text-navy underline hover:text-gold"
          >
            Add your first item
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Name</th>
                {config.subtitleField && (
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                    {config.subtitleField.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </th>
                )}
                {config.urlPrefix && (
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">URL</th>
                )}
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-navy">
                      {(item[config.titleField] as string) || '—'}
                    </span>
                  </td>
                  {config.subtitleField && (
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {(item[config.subtitleField] as string) || '—'}
                      </span>
                    </td>
                  )}
                  {config.urlPrefix && (
                    <td className="px-6 py-4">
                      <a
                        href={`${config.urlPrefix}/${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                      >
                        {config.urlPrefix}/{(item.slug as string) || '?'}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="rounded-lg p-2 text-navy hover:bg-gray-100"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, (item[config.titleField] as string) || 'item')}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {(creating || editingItem) && (
          <ContentEditModal
            type={contentType}
            config={config}
            item={editingItem}
            onClose={() => {
              setCreating(false);
              setEditingItem(null);
            }}
            onSaved={() => {
              setCreating(false);
              setEditingItem(null);
              loadItems();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ContentEditModal({
  type,
  config,
  item,
  onClose,
  onSaved,
}: {
  type: string;
  config: typeof FIELD_CONFIGS[string];
  item: ContentItem | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (item) {
      const v: Record<string, string> = {};
      for (const field of config.fields) {
        const raw = item[field.name];
        if (field.type === 'json-array') {
          // Parse JSON array to newline-separated text
          try {
            const arr = typeof raw === 'string' ? JSON.parse(raw) : raw;
            v[field.name] = Array.isArray(arr) ? arr.join('\n') : '';
          } catch {
            v[field.name] = '';
          }
        } else if (field.type === 'boolean') {
          v[field.name] = raw ? 'true' : 'false';
        } else {
          v[field.name] = (raw as string) || '';
        }
      }
      setValues(v);
    } else {
      // Defaults for new item
      const v: Record<string, string> = {};
      for (const field of config.fields) {
        v[field.name] = field.type === 'boolean' ? 'false' : '';
      }
      setValues(v);
    }
  }, [item, config]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      // Convert form values to API body
      const body: Record<string, unknown> = {};
      for (const field of config.fields) {
        const val = values[field.name];
        if (field.type === 'json-array') {
          body[field.name] = val
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean);
        } else if (field.type === 'boolean') {
          body[field.name] = val === 'true';
        } else if (field.type === 'number') {
          body[field.name] = parseInt(val) || 0;
        } else {
          body[field.name] = val;
        }
      }

      const url = item
        ? `/api/admin/content/${type}/${item.id}`
        : `/api/admin/content/${type}`;
      const method = item ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Save failed');
        setSaving(false);
        return;
      }

      onSaved();
    } catch {
      setError('Network error');
      setSaving(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy">
            {item ? 'Edit' : 'Add'} {config.label.replace(/s$/, '')}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {config.fields.map((field) => (
            <div key={field.name}>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  value={values[field.name] || ''}
                  onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                  required={field.required}
                  rows={3}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                />
              ) : field.type === 'json-array' ? (
                <textarea
                  value={values[field.name] || ''}
                  onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                  rows={4}
                  placeholder={field.placeholder || 'One item per line'}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                />
              ) : field.type === 'boolean' ? (
                <select
                  value={values[field.name] || 'false'}
                  onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              ) : (
                <input
                  type={field.type === 'number' ? 'number' : 'text'}
                  value={values[field.name] || ''}
                  onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                />
              )}
            </div>
          ))}

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-navy py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}