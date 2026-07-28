import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root = process.cwd();
export const readJson = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
export const writeJson = (p, data) => { const full = path.join(root, p); fs.mkdirSync(path.dirname(full), {recursive:true}); fs.writeFileSync(full, JSON.stringify(data, null, 2) + '\n'); };
export const ensureDir = (p) => fs.mkdirSync(path.join(root, p), {recursive:true});
export const sha = (obj) => crypto.createHash('sha256').update(JSON.stringify(obj)).digest('hex');
export const slugify = (s) => s.toLowerCase().replace(/\[sample\]/g,'sample').replace(/[^a-z0-9가-힣]+/g,'-').replace(/^-|-$/g,'').slice(0,80);
export function loadRegistry(){ return readJson('data/source-registry.json'); }
export function policyCheck(candidate, registry){
  const src = registry.find(s => s.source_id === candidate.source_id);
  if (!src) return {decision:'BLOCK', code:'SOURCE_NOT_REGISTERED'};
  const url = new URL(candidate.source_url);
  if (url.hostname !== src.official_domain && !url.hostname.endsWith('.'+src.official_domain)) return {decision:'BLOCK', code:'OFFICIAL_DOMAIN_MISMATCH'};
  if (!['S','A'].includes(src.source_grade)) return {decision:'BLOCK', code:'SOURCE_GRADE_INSUFFICIENT'};
  if (src.policy_check_status !== 'allow') return {decision:'MANUAL_REVIEW', code:'TERMS_UNVERIFIED'};
  if (!src.collection_methods.includes(candidate.collection_method)) return {decision:'MANUAL_REVIEW', code:'TERMS_UNVERIFIED'};
  return {decision:'ALLOW', code:'ALLOW'};
}
export function daysLeft(deadline){ if (!deadline || deadline === '상시') return null; const d = new Date(deadline.replace(' ', 'T') + ':00+09:00'); if (Number.isNaN(d.getTime())) return null; const base = new Date('2026-07-29T00:00:00+09:00'); return Math.ceil((d - base) / 86400000); }
export function normalize(c){ return {...c, slug: slugify(c.title), status: daysLeft(c.deadline) !== null && daysLeft(c.deadline) < 0 ? 'closed' : (daysLeft(c.deadline) !== null && daysLeft(c.deadline) <= 7 ? 'deadline_soon' : 'new'), content_status: 'draft', verified_at: '2026-07-29 05:00 KST', change_summary: 'fixture 기반 신규 후보', raw_hash: c.raw_hash || sha(c)}; }
export function verify(n){ const required = ['title','source_url','source_id','issuer','deadline','support_target','support_summary','source_published_at']; const missing = required.filter(k => n[k] === undefined || n[k] === null || n[k] === ''); if (missing.length) return {ok:false, code:'REQUIRED_FIELD_MISSING', missing}; if (!['S','A'].includes(n.source_grade)) return {ok:false, code:'SOURCE_GRADE_INSUFFICIENT'}; return {ok:true, code:'PASS'}; }
export function noticeMarkdown(n){ return `---\ntitle: "${n.title}"\ndate: "2026-07-29"\nsource_published_at: "${n.source_published_at}"\nsource_updated_at: ${n.source_updated_at ? `"${n.source_updated_at}"` : 'null'}\ndeadline: "${n.deadline}"\nstatus: "${n.status}"\nsegment: ${JSON.stringify(n.segment)}\ntheme: ${JSON.stringify(n.theme)}\nregion: ${JSON.stringify(n.region)}\nissuer: "${n.issuer}"\nsource_grade: "${n.source_grade}"\nsource_url: "${n.source_url}"\nsource_id: "${n.source_id}"\ncollection_method: "${n.collection_method}"\nverified_at: "${n.verified_at}"\ncontent_status: "draft"\nchange_summary: "${n.change_summary}"\nlicense_note: "${n.license_note}"\n---\n\n## 1. 3줄 요약\n\n- 이 문서는 **SAMPLE fixture**로 생성된 파이프라인 검증용 초안입니다.\n- 실제 공고가 아니며, 공개 발행 대상이 아닙니다.\n- 원문 사실과 편집 판단 분리 구조를 테스트합니다.\n\n## 2. 지원 또는 정책 내용\n\n${n.support_summary}\n\n## 3. 대상·조건\n\n${n.support_target}\n\n## 4. 신청·일정\n\n- 신청 시작: ${n.application_start_at ?? '원문 확인 필요'}\n- 마감: ${n.deadline}\n\n## 5. 대상별 판단\n\n| 대상 | 적합도 | 판단 근거 |\n|---|---|---|\n| 스타트업 | Medium | SAMPLE 원문 조건에 근거한 데모 판단입니다. |\n| 1인 사업자 | Medium | SAMPLE 원문 조건에 근거한 데모 판단입니다. |\n| 소상공인 | Medium | SAMPLE 원문 조건에 근거한 데모 판단입니다. |\n\n## 6. 편집 메모\n\n실제 운영에서는 공식 원문에서 확인된 사실만 사실 영역에 쓰고, 실무 판단은 이 섹션에 분리합니다.\n\n## 7. 공식 원문\n\n- 기관: ${n.issuer}\n- URL: ${n.source_url}\n- 검증 시각: ${n.verified_at}\n\n> 이 페이지는 공식 공고를 바탕으로 한 일반 정보입니다. 신청 자격, 제출 서류, 세무·노무·법률 판단은 반드시 공식 원문과 관계 기관 또는 자격 전문가를 통해 확인하세요.\n`; }
