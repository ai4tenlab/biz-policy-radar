import fs from 'node:fs';
const mustExist = ['docs/methodology.md','docs/editorial-policy.md','docs/source-licenses.md','data/source-registry.json','.env.example'];
const missing = mustExist.filter(p=>!fs.existsSync(p)); if (missing.length) { console.error('Missing required files: '+missing.join(', ')); process.exit(1); }
console.log('LINT_OK');
