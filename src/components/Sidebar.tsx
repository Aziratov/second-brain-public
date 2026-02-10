'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Brain,
  Search,
  BookOpen,
  Lightbulb,
  FolderKanban,
  StickyNote,
  FileText,
  ChevronRight,
  Calendar,
  Sparkles,
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

const categoryIcons: Record<string, React.ReactNode> = {
  journal: <BookOpen size={16} />,
  concepts: <Lightbulb size={16} />,
  projects: <FolderKanban size={16} />,
  notes: <StickyNote size={16} />,
};

const categoryColors: Record<string, string> = {
  journal: 'text-green-400',
  concepts: 'text-purple-400',
  projects: 'text-blue-400',
  notes: 'text-yellow-400',
};

function formatDate(dateStr: string): string {
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
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function Sidebar({
  docs,
  activeSlug,
}: {
  docs: DocMeta[];
  activeSlug?: string;
}) {
  const [search, setSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['journal', 'concepts', 'projects', 'notes'])
  );

  const filtered = search.trim()
    ? docs.filter(
        (d) =>
          d.title.toLowerCase().includes(search.toLowerCase()) ||
          d.summary.toLowerCase().includes(search.toLowerCase()) ||
          d.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      )
    : docs;

  const grouped = filtered.reduce<Record<string, DocMeta[]>>((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = [];
    acc[doc.category].push(doc);
    return acc;
  }, {});

  const categoryOrder = ['journal', 'concepts', 'projects', 'notes'];
  const sortedCategories = categoryOrder.filter((c) => grouped[c]);

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  return (
    <aside
      className="flex flex-col border-r h-screen"
      style={{
        width: 'var(--sidebar-width)',
        minWidth: 'var(--sidebar-width)',
        background: 'var(--bg-secondary)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Header */}
      <div className="p-4 flex items-center gap-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'var(--accent-purple)', color: '#fff' }}
        >
          <Brain size={18} />
        </div>
        <div>
          <h1 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Second Brain
          </h1>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {docs.length} document{docs.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}
        >
          <Search size={14} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm flex-1"
            style={{ color: 'var(--text-primary)' }}
          />
        </div>
      </div>

      {/* Quick links */}
      <div className="px-3 mb-2 flex gap-1.5">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors"
          style={{
            background: !activeSlug ? 'var(--bg-surface)' : 'transparent',
            color: !activeSlug ? 'var(--accent-blue)' : 'var(--text-secondary)',
          }}
        >
          <Sparkles size={12} />
          All
        </Link>
        <Link
          href="/?filter=journal"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <Calendar size={12} />
          Journal
        </Link>
      </div>

      {/* Document tree */}
      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {sortedCategories.map((category) => (
          <div key={category} className="mb-1">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium uppercase tracking-wider transition-colors hover:opacity-80"
              style={{ color: 'var(--text-muted)' }}
            >
              <ChevronRight
                size={12}
                className={`transition-transform ${
                  expandedCategories.has(category) ? 'rotate-90' : ''
                }`}
              />
              <span className={categoryColors[category] || ''}>
                {categoryIcons[category] || <FileText size={16} />}
              </span>
              {category}
              <span
                className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full"
                style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)' }}
              >
                {grouped[category].length}
              </span>
            </button>

            {expandedCategories.has(category) && (
              <div className="ml-3 mt-0.5 space-y-0.5 animate-fade-in">
                {grouped[category].map((doc) => {
                  const isActive = activeSlug === doc.slug;
                  return (
                    <Link
                      key={doc.slug}
                      href={`/doc/${doc.slug}`}
                      className="flex flex-col gap-0.5 px-2.5 py-2 rounded-md transition-all group"
                      style={{
                        background: isActive ? 'var(--bg-surface)' : 'transparent',
                        borderLeft: isActive ? '2px solid var(--accent-blue)' : '2px solid transparent',
                      }}
                    >
                      <span
                        className="text-sm truncate"
                        style={{
                          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                          fontWeight: isActive ? 500 : 400,
                        }}
                      >
                        {doc.title}
                      </span>
                      <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        {formatDate(doc.updated)}
                        {doc.tags.length > 0 && (
                          <span className="ml-2">
                            {doc.tags.slice(0, 2).map((t) => (
                              <span
                                key={t}
                                className="inline-block px-1 py-0 rounded text-[10px] mr-1"
                                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
                              >
                                {t}
                              </span>
                            ))}
                          </span>
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
            <FileText size={24} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No documents found</p>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div
        className="p-3 border-t text-[11px] flex items-center justify-between"
        style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
      >
        <span>Jarvis 2nd Brain</span>
        <span>Opus 4.6</span>
      </div>
    </aside>
  );
}
