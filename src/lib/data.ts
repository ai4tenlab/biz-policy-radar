import fs from 'node:fs';
import path from 'node:path';

export function notices() {
  const p = path.join(process.cwd(), 'data/normalized/notices.json');
  if (!fs.existsSync(p)) return [];
  const rows = JSON.parse(fs.readFileSync(p, 'utf8'));
  return rows.filter((notice: any) => {
    const title = String(notice.title ?? '').toLowerCase();
    return notice.content_status === 'published' && notice.status === 'PASS' && !title.includes('sample') && !title.includes('fixture');
  });
}

export function publicSummary() {
  const items = notices();
  return {
    published: items.length,
    deadlineSoon: items.filter((n: any) => n.deadline_status === 'soon').length,
    closed: items.filter((n: any) => n.deadline_status === 'closed').length,
    updatedAt: items[0]?.verified_at ?? null,
  };
}

export function statusSummary() {
  const p = path.join(process.cwd(), 'data/manifests/latest.json');
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : { pass: 0, manual_review: 0, blocked: 0 };
}
