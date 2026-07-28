import fs from 'node:fs'; import path from 'node:path';
export type Notice = { slug:string; title:string; deadline:string; status:string; segment:string[]; theme:string[]; region:string[]; issuer:string; source_url:string; verified_at:string; support_summary:string; content_status:string; source_grade:string; };
export function notices(): Notice[] { const p = path.join(process.cwd(), 'data/normalized/notices.json'); return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : []; }
export function statusSummary() { const p = path.join(process.cwd(), 'data/manifests/latest.json'); return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {pass:0, manual_review:0, blocked:0}; }
