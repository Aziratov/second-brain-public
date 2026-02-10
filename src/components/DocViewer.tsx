'use client';

import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import {
  Clock,
  Calendar,
  Tag,
  BookOpen,
  Lightbulb,
  FolderKanban,
  StickyNote,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

interface Doc {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  created: string;
  updated: string;
  summary: string;
  content: string;
  priority: string;
}

const categoryConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  journal: { icon: <BookOpen size={14} />, color: 'var(--accent-green)', bg: 'rgba(52, 211, 153, 0.1)' },
  concepts: { icon: <Lightbulb size={14} />, color: 'var(--accent-purple)', bg: 'rgba(167, 139, 250, 0.1)' },
  projects: { icon: <FolderKanban size={14} />, color: 'var(--accent-blue)', bg: 'rgba(88, 166, 255, 0.1)' },
  notes: { icon: <StickyNote size={14} />, color: 'var(--accent-yellow)', bg: 'rgba(251, 191, 36, 0.1)' },
};

const priorityColors: Record<string, string> = {
  high: 'var(--accent-red)',
  medium: 'var(--accent-orange)',
  low: 'var(--accent-green)',
};

function formatFullDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function DocViewer({ doc }: { doc: Doc }) {
  const cat = categoryConfig[doc.category] || categoryConfig.notes;

  return (
    <div className="flex-1 overflow-y-auto animate-fade-in" style={{ background: 'var(--bg-primary)' }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-10 flex items-center gap-3 px-6 py-3 border-b backdrop-blur-md"
        style={{
          borderColor: 'var(--border)',
          background: 'rgba(13, 17, 23, 0.85)',
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-md transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          <ArrowLeft size={14} />
          Back
        </Link>
        <span style={{ color: 'var(--border)' }}>|</span>
        <div
          className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium"
          style={{ background: cat.bg, color: cat.color }}
        >
          {cat.icon}
          {doc.category}
        </div>
        {doc.priority && (
          <div
            className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-md"
            style={{
              color: priorityColors[doc.priority] || 'var(--text-muted)',
              background: 'var(--bg-surface)',
            }}
          >
            {doc.priority}
          </div>
        )}
      </div>

      {/* Document content */}
      <article className="max-w-3xl mx-auto px-8 py-10">
        {/* Title */}
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: 'var(--text-primary)', letterSpacing: '-0.025em' }}
        >
          {doc.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            Created {formatFullDate(doc.created)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            Updated {formatFullDate(doc.updated)}
          </span>
        </div>

        {/* Summary */}
        {doc.summary && (
          <div
            className="mb-8 px-4 py-3 rounded-lg border-l-3 text-sm"
            style={{
              background: 'var(--bg-secondary)',
              borderLeftColor: cat.color,
              color: 'var(--text-secondary)',
            }}
          >
            {doc.summary}
          </div>
        )}

        {/* Tags */}
        {doc.tags.length > 0 && (
          <div className="flex items-center gap-2 mb-8">
            <Tag size={12} style={{ color: 'var(--text-muted)' }} />
            {doc.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-xs"
                style={{ background: 'var(--bg-surface)', color: 'var(--text-secondary)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="prose-brain">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
          >
            {doc.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
