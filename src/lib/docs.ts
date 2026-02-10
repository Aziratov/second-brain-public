import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const DOCS_DIR = path.join(process.cwd(), 'docs');

export interface DocMeta {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  created: string;
  updated: string;
  summary: string;
  icon: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Doc extends DocMeta {
  content: string;
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    journal: 'book-open',
    concepts: 'lightbulb',
    projects: 'folder-kanban',
    notes: 'sticky-note',
  };
  return icons[category] || 'file-text';
}

function getCategoryFromPath(filePath: string): string {
  const relative = path.relative(DOCS_DIR, filePath);
  const parts = relative.split(path.sep);
  return parts.length > 1 ? parts[0] : 'notes';
}

function getAllMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

export function getDocSlugs(): string[] {
  const files = getAllMarkdownFiles(DOCS_DIR);
  return files.map(f => {
    const relative = path.relative(DOCS_DIR, f);
    return relative.replace(/\.md$/, '');
  });
}

export function getAllDocs(): DocMeta[] {
  const files = getAllMarkdownFiles(DOCS_DIR);
  const docs: DocMeta[] = files.map(filePath => {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    const relative = path.relative(DOCS_DIR, filePath);
    const slug = relative.replace(/\.md$/, '');
    const category = getCategoryFromPath(filePath);
    const stat = fs.statSync(filePath);

    return {
      slug,
      title: data.title || path.basename(filePath, '.md').replace(/-/g, ' '),
      category,
      tags: data.tags || [],
      created: data.created || stat.birthtime.toISOString(),
      updated: data.updated || stat.mtime.toISOString(),
      summary: data.summary || '',
      icon: data.icon || getCategoryIcon(category),
      priority: data.priority || 'medium',
    };
  });

  // Sort by updated date, newest first
  docs.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());
  return docs;
}

export function getDocBySlug(slug: string): Doc | null {
  const filePath = path.join(DOCS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const category = getCategoryFromPath(filePath);
  const stat = fs.statSync(filePath);

  return {
    slug,
    title: data.title || path.basename(filePath, '.md').replace(/-/g, ' '),
    category,
    tags: data.tags || [],
    created: data.created || stat.birthtime.toISOString(),
    updated: data.updated || stat.mtime.toISOString(),
    summary: data.summary || '',
    icon: data.icon || getCategoryIcon(category),
    priority: data.priority || 'medium',
    content,
  };
}

export function getCategories(): { name: string; count: number; icon: string }[] {
  const docs = getAllDocs();
  const catMap = new Map<string, number>();
  for (const doc of docs) {
    catMap.set(doc.category, (catMap.get(doc.category) || 0) + 1);
  }
  return Array.from(catMap.entries()).map(([name, count]) => ({
    name,
    count,
    icon: getCategoryIcon(name),
  }));
}

export function searchDocs(query: string): DocMeta[] {
  if (!query.trim()) return getAllDocs();
  const q = query.toLowerCase();
  const allDocs = getAllDocs();
  return allDocs.filter(doc =>
    doc.title.toLowerCase().includes(q) ||
    doc.summary.toLowerCase().includes(q) ||
    doc.tags.some(t => t.toLowerCase().includes(q)) ||
    doc.category.toLowerCase().includes(q)
  );
}
