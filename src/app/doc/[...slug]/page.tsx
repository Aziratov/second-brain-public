import { getAllDocs, getDocBySlug, getDocSlugs } from '@/lib/docs';
import Sidebar from '@/components/Sidebar';
import DocViewer from '@/components/DocViewer';
import { Brain } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug.join('/');
  const doc = getDocBySlug(slugPath);
  const allDocs = getAllDocs();

  if (!doc) {
    return (
      <div className="flex h-screen">
        <Sidebar docs={allDocs} />
        <div className="flex-1 flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
          <div className="text-center">
            <Brain size={48} className="mx-auto mb-4 opacity-20" style={{ color: 'var(--text-muted)' }} />
            <h2 className="text-lg font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Document not found
            </h2>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              The document &quot;{slugPath}&quot; doesn&apos;t exist.
            </p>
            <Link
              href="/"
              className="text-sm px-4 py-2 rounded-lg"
              style={{ background: 'var(--accent-blue)', color: '#fff' }}
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar docs={allDocs} activeSlug={slugPath} />
      <DocViewer doc={doc} />
    </div>
  );
}
