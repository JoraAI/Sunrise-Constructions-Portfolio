'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  Trash2,
  Search,
  ImageIcon,
  VideoIcon,
  FileIcon,
  Loader2,
  X,
  AlertCircle,
  Copy,
  Check,
  Pencil,
} from 'lucide-react';

interface MediaAsset {
  id: string;
  section: string;
  filename: string;
  storage_path: string;
  public_url: string;
  alt_text: string | null;
  mime_type: string | null;
  file_size: number | null;
  uploaded_by: string | null;
  created_at: string;
}

const SECTIONS = [
  { value: 'all', label: 'All Sections' },
  { value: 'hero', label: 'Hero / Homepage' },
  { value: 'projects', label: 'Projects' },
  { value: 'services', label: 'Services' },
  { value: 'industries', label: 'Industries' },
  { value: 'team', label: 'Leadership Team' },
  { value: 'testimonials', label: 'Testimonials' },
  { value: 'blog', label: 'Blog / News' },
  { value: 'careers', label: 'Careers' },
  { value: 'about', label: 'About Us' },
  { value: 'general', label: 'General' },
];

function formatFileSize(bytes: number | null): string {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(mimeType: string | null) {
  if (mimeType?.startsWith('image/')) return ImageIcon;
  if (mimeType?.startsWith('video/')) return VideoIcon;
  return FileIcon;
}

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterSection, setFilterSection] = useState('all');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaAsset | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [usageMap, setUsageMap] = useState<Record<string, { type: string; title: string }[]>>({});
  const [deleteTarget, setDeleteTarget] = useState<MediaAsset | null>(null);

  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/media?section=${filterSection}`);
      if (res.ok) {
        const data = await res.json();
        setMedia(data.media || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [filterSection]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  // Check usage for all media after load
  useEffect(() => {
    if (media.length === 0) return;
    media.forEach(async (item) => {
      try {
        const res = await fetch(`/api/admin/media/${item.id}/usage`);
        if (res.ok) {
          const data = await res.json();
          if (data.inUse) {
            setUsageMap((prev) => ({ ...prev, [item.id]: data.usage }));
          }
        }
      } catch { /* ignore */ }
    });
  }, [media]);

  async function handleDelete(id: string) {
    const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMedia((prev) => prev.filter((m) => m.id !== id));
      setUsageMap((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } else {
      alert('Failed to delete media. Please try again.');
    }
  }

  function handleDeleteClick(item: MediaAsset) {
    const usage = usageMap[item.id];
    if (usage && usage.length > 0) {
      setDeleteTarget(item); // Opens confirmation popup
    } else {
      handleDelete(item.id); // Direct delete, no popup
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Media Library</h1>
          <p className="text-sm text-gray-500">Upload, manage, and organize images and videos</p>
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
        >
          <Upload className="h-4 w-4" />
          Upload Media
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Search className="h-4 w-4" />
          <span>Filter:</span>
        </div>
        <select
          value={filterSection}
          onChange={(e) => setFilterSection(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-navy focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        >
          {SECTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-400">{media.length} items</span>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
        </div>
      ) : media.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-20 text-center">
          <ImageIcon className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-gray-500">No media uploaded yet</p>
          <button
            onClick={() => setUploadOpen(true)}
            className="mt-4 text-sm font-medium text-navy underline hover:text-gold"
          >
            Upload your first file
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {media.map((item) => {
            const Icon = getFileIcon(item.mime_type);
            const isImage = item.mime_type?.startsWith('image/');
            const isVideo = item.mime_type?.startsWith('video/');
            return (
              <motion.div
                key={item.id}
                layout
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                {/* Preview */}
                <div className="relative aspect-square bg-gray-50">
                  {isImage ? (
                    <img
                      src={item.public_url}
                      alt={item.alt_text || item.filename}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : isVideo ? (
                    <video
                      src={item.public_url}
                      className="h-full w-full object-cover"
                      muted
                      loop
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => e.currentTarget.pause()}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Icon className="h-10 w-10 text-gray-300" />
                    </div>
                  )}

                  {/* Hover actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-navy/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => copyUrl(item.public_url)}
                      title="Copy URL"
                      className="rounded-lg bg-white/90 p-2 text-navy hover:bg-white"
                    >
                      {copiedUrl === item.public_url ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => setEditingItem(item)}
                      title="Edit details"
                      className="rounded-lg bg-white/90 p-2 text-navy hover:bg-white"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item)}
                      title="Delete"
                      className="rounded-lg bg-white/90 p-2 text-red-500 hover:bg-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="truncate text-xs font-medium text-navy" title={item.filename}>
                    {item.filename}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium uppercase text-gray-500">
                      {item.section}
                    </span>
                    {usageMap[item.id] ? (
                      <span className="flex items-center gap-1 rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700" title={usageMap[item.id].map((u) => `${u.type}: ${u.title}`).join(', ')}>
                        ● In Use ({usageMap[item.id].length})
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">
                        {formatFileSize(item.file_size)}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {uploadOpen && (
          <UploadModal
            sections={SECTIONS}
            onClose={() => setUploadOpen(false)}
            onUploaded={() => {
              setUploadOpen(false);
              loadMedia();
            }}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Popup */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteConfirmModal
            item={deleteTarget}
            usage={usageMap[deleteTarget.id] || []}
            onClose={() => setDeleteTarget(null)}
            onConfirm={() => {
              handleDelete(deleteTarget.id);
              setDeleteTarget(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingItem && (
          <EditModal
            item={editingItem}
            sections={SECTIONS}
            onClose={() => setEditingItem(null)}
            onSaved={() => {
              setEditingItem(null);
              loadMedia();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/** Upload modal */
function UploadModal({
  sections,
  onClose,
  onUploaded,
}: {
  sections: typeof SECTIONS;
  onClose: () => void;
  onUploaded: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [section, setSection] = useState('general');
  const [altText, setAltText] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('section', section);
      formData.append('alt_text', altText);

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Upload failed');
        setUploading(false);
        return;
      }

      onUploaded();
    } catch {
      setError('Network error. Please try again.');
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
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
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy">Upload Media</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleUpload} className="space-y-4">
          {/* Drop zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-8 transition-colors ${
              dragOver ? 'border-gold bg-gold/5' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input
              id="file-input"
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            {file ? (
              <div className="text-center">
                <p className="text-sm font-medium text-navy">{file.name}</p>
                <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                <p className="text-sm text-gray-500">Click or drag to upload</p>
                <p className="text-xs text-gray-400">Images and videos</p>
              </div>
            )}
          </div>

          {/* Section */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Section</label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
            >
              {sections
                .filter((s) => s.value !== 'all')
                .map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
            </select>
          </div>

          {/* Alt text */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Alt Text <span className="text-gray-400">(for accessibility/SEO)</span>
            </label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Describe this image..."
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={uploading || !file}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              'Upload'
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

/** Edit modal */
function EditModal({
  item,
  sections,
  onClose,
  onSaved,
}: {
  item: MediaAsset;
  sections: typeof SECTIONS;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [altText, setAltText] = useState(item.alt_text || '');
  const [section, setSection] = useState(item.section);
  const [saving, setSaving] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(`/api/admin/media/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alt_text: altText, section }),
    });

    if (res.ok) {
      onSaved();
    } else {
      alert('Failed to update. Please try again.');
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
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy">Edit Media</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Section</label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
            >
              {sections
                .filter((s) => s.value !== 'all')
                .map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Alt Text</label>
            <textarea
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
            />
          </div>

          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-400">Public URL</p>
            <p className="mt-1 break-all text-xs text-navy">{item.public_url}</p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

/** Delete confirmation modal for in-use images */
function DeleteConfirmModal({
  item,
  usage,
  onClose,
  onConfirm,
}: {
  item: MediaAsset;
  usage: { type: string; title: string }[];
  onClose: () => void;
  onConfirm: () => void;
}) {
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
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
            <AlertCircle className="h-5 w-5 text-amber-600" />
          </span>
          <h2 className="text-lg font-bold text-navy">Image In Use</h2>
        </div>

        <p className="text-sm text-gray-600">
          This image is currently being used by:
        </p>

        <ul className="mt-3 space-y-2">
          {usage.map((u, i) => (
            <li key={i} className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm">
              <span className="rounded bg-navy/10 px-2 py-0.5 text-xs font-bold text-navy">{u.type}</span>
              <span className="font-medium text-navy">{u.title}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-sm text-gray-500">
          Deleting will replace this image with a placeholder on all listed items. Are you sure?
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-semibold text-white hover:bg-red-600"
          >
            Delete & Replace
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
