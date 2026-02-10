'use client';

import Link from 'next/link';
import {
  BookOpen,
  Lightbulb,
  FolderKanban,
  StickyNote,
} from 'lucide-react';

interface DocMeta {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  created: string;
  updated: string;
  summary: string;
  priority: string;
}

const categoryConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  journal: { icon: <BookOpen size={14} />, color: 'var(--accent-green)', bg: 'rgba(52, 211, 153, 0.08)' },
  concepts: { icon: <Lightbulb size={14} />, color: 'var(--accent-purple)', bg: 'rgba(167, 139, 250, 0.08)' },
  projects: { icon: <FolderKanban size={14} />, color: 'var(--accent-blue)', bg: 'rgba(88, 166, 255, 0.08)' },
  notes: { icon: <StickyNote size={14} />, color: 'var(--accent-yellow)', bg: 'rgba(251, 191, 36, 0.08)' },
};

function timeAgo(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function DocCard({ doc }: { doc: DocMeta }) {
  const cat = categoryConfig[doc.category] || categoryConfig.notes;

  return (
    <Link
      href={`/doc/${doc.slug}`}
      className="group block rounded-xl border transition-all duration-200"
      style={{
        background: 'var(--bg-secondary)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="p-5">
        {/* Category + time row */}
        <div className="flex items-center justify-between mb-3">
          <div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium"
            style={{ background: cat.bg, color: cat.color }}
          >
            {cat.icon}
            {doc.category}
          </div>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {timeAgo(doc.updated)}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-base font-semibold mb-2 group-hover:opacity-80 transition-opacity"
          style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
        >
          {doc.title}
        </h3>

        {/* Summary */}
        {doc.summary && (
          <p
            className="text-sm mb-3 line-clamp-2"
            style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}
          >
            {doc.summary}
          </p>
        )}

        {/* Tags */}
        {doc.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {doc.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-1.5 py-0.5 rounded"
                style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
