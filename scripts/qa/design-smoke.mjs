import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const base = process.env.DESIGN_QA_BASE || 'http://127.0.0.1:4321/biz-policy-radar/';
const outDir = 'tmp/design-qa';
await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const cases = [
  { name: 'home-mobile', url: base, width: 390, height: 844 },
  { name: 'home-desktop', url: base, width: 1440, height: 1000 },
  { name: 'detail-mobile', url: base + 'notices/gyeongnam-2026-food-promotion-fund-loan/', width: 390, height: 844 },
  { name: 'detail-desktop', url: base + 'notices/gyeongnam-2026-food-promotion-fund-loan/', width: 1440, height: 1000 },
];
const results = [];
for (const c of cases) {
  const page = await browser.newPage({ viewport: { width: c.width, height: c.height }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  const resp = await page.goto(c.url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${outDir}/${c.name}.png`, fullPage: true });
  const metrics = await page.evaluate(() => {
    const body = document.body;
    const doc = document.documentElement;
    const navLinks = [...document.querySelectorAll('.nav-links a')].filter(a => getComputedStyle(a).display !== 'none').map(a => a.textContent.trim());
    const cards = document.querySelectorAll('.card').length;
    const quick = document.querySelectorAll('.quick-card').length;
    const sticky = document.querySelector('.sticky-side');
    const cta = document.querySelector('.mobile-bottom-cta');
    return {
      title: document.title,
      bodyText: body.innerText.slice(0, 300),
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      horizontalOverflow: doc.scrollWidth > doc.clientWidth + 1,
      navLinks,
      cards,
      quick,
      stickyPosition: sticky ? getComputedStyle(sticky).position : null,
      mobileCtaDisplay: cta ? getComputedStyle(cta).display : null,
      h1: document.querySelector('h1')?.textContent?.trim() ?? null,
      h2: document.querySelector('h2')?.textContent?.trim() ?? null,
    };
  });
  results.push({ ...c, status: resp?.status(), errors, metrics, screenshot: `${outDir}/${c.name}.png` });
  await page.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 2));

const failed = results.filter(r => r.status !== 200 || r.errors.length || r.metrics.horizontalOverflow);
if (failed.length) process.exitCode = 1;
