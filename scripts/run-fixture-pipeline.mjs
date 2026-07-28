import fs from 'node:fs';
import path from 'node:path';
import { readJson, writeJson, ensureDir, loadRegistry, policyCheck, normalize, verify, noticeMarkdown } from './lib/pipeline.mjs';
const registry = loadRegistry();
const candidates = readJson('data/fixtures/sample-candidates.json');
const logs = [], normalized = [], manual = [], blocked = [];
ensureDir('logs/collection'); ensureDir('logs/verification'); ensureDir('logs/blocked'); ensureDir('logs/manual-review'); ensureDir('src/content/notices');
for (const c of candidates) {
  const policy = policyCheck(c, registry);
  logs.push({candidate:c.title, source_id:c.source_id, ...policy, checked_at:'2026-07-29T05:00:00+09:00'});
  if (policy.decision === 'ALLOW') {
    const n = normalize(c); const v = verify(n);
    if (v.ok) { normalized.push(n); fs.writeFileSync(path.join(process.cwd(), 'src/content/notices', `${n.slug}.md`), noticeMarkdown(n)); }
    else blocked.push({candidate:c.title, ...v});
  } else if (policy.decision === 'MANUAL_REVIEW') manual.push({candidate_id:c.raw_hash, source_name:c.source_name, source_url:c.source_url, detected_at:c.fetched_at, collection_method_attempted:c.collection_method, review_reason_code:policy.code, summary:c.title, next_review_date:'2026-07-30', status:'pending'});
  else blocked.push({candidate:c.title, ...policy});
}
writeJson('data/normalized/notices.json', normalized); writeJson('data/manual-review-queue.json', manual); writeJson('logs/collection/latest.json', logs); writeJson('logs/verification/latest.json', {pass: normalized.length, manual_review: manual.length, blocked: blocked.length}); writeJson('logs/blocked/latest.json', blocked); writeJson('logs/manual-review/latest.json', manual); writeJson('data/manifests/latest.json', {generated_at:'2026-07-29T05:00:00+09:00', candidates:candidates.length, pass:normalized.length, manual_review:manual.length, blocked:blocked.length});
console.log(`PIPELINE_OK pass=${normalized.length} manual_review=${manual.length} blocked=${blocked.length}`);
