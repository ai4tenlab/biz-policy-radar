import fs from 'node:fs'; import path from 'node:path';
const dir = 'src/content/notices'; const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f=>f.endsWith('.md')) : [];
const required = ['## 1. 3줄 요약','## 2. 지원 또는 정책 내용','## 3. 대상·조건','## 4. 신청·일정','## 5. 대상별 판단','## 6. 편집 메모','## 7. 공식 원문'];
let failures=[]; for (const f of files) { const text=fs.readFileSync(path.join(dir,f),'utf8'); for (const r of required) if (!text.includes(r)) failures.push(`${f}: missing ${r}`); for (const banned of ['무조건 선정','누구나 가능','절세 보장','매출 상승 보장']) if (text.includes(banned)) failures.push(`${f}: banned ${banned}`); }
if (failures.length) { console.error(failures.join('\n')); process.exit(1); } console.log(`CONTENT_QA_OK files=${files.length}`);
