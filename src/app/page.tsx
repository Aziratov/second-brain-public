import { getAllDocs } from '@/lib/docs';
import Sidebar from '@/components/Sidebar';
import DocCard from '@/components/DocCard';
import { Brain, FileText, BookOpen, Lightbulb, FolderKanban, StickyNote } from 'lucide-react';

export const dynamic = 'force-dynamic';

const categoryStats: Record<string, { icon: React.ReactNode; color: string }> = {
  journal: { icon: <BookOpen size={18} />, color: 'var(--accent-green)' },
  concepts: { icon: <Lightbulb size={18} />, color: 'var(--accent-purple)' },
  projects: { icon: <FolderKanban size={18} />, color: 'var(--accent-blue)' },
  notes: { icon: <StickyNote size={18} />, color: 'var(--accent-yellow)' },
};

export default function Home() {
  const docs = getAllDocs();

  const catCounts = docs.reduce<Record<string, number>>((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex h-screen">
      <Sidebar docs={docs} />

      <main className="flex-1 overflow-y-auto" style={{ background: 'var(--bg-primary)' }}>
        {/* Header */}
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <Brain size={28} style={{ color: 'var(--accent-purple)' }} />
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Second Brain
            </h1>
          </div>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Knowledge base generated from conversations between Mo and Jarvis
          </p>

          {/* Stats row */}
          <div className="flex gap-3 mb-8">
            {Object.entries(categoryStats).map(([name, { icon, color }]) => (
              <div
                key={name}
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              >
                <span style={{ color }}>{icon}</span>
                <span className="text-sm capitalize" style={{ color: 'var(--text-secondary)' }}>{name}</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {catCounts[name] || 0}
                </span>
              </div>
            ))}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg ml-auto"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <FileText size={18} style={{ color: 'var(--text-muted)' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total</span>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {docs.length}
              </span>
            </div>
          </div>
        </div>

        {/* Document grid */}
        <div className="px-8 pb-8">
          {docs.length > 0 ? (
            <>
              <h2 className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
                Recent Documents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {docs.map((doc) => (
                  <DocCard key={doc.slug} doc={doc} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <Brain size={48} className="mx-auto mb-4 opacity-20" style={{ color: 'var(--text-muted)' }} />
              <h2 className="text-lg font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                No documents yet
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                As Jarvis works with Mo, documents will appear here automatically.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
