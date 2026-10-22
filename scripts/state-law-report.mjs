/**
 * state-law-report.mjs — writes docs/STATE_LAW_REVIEW.md from
 * src/data/state-laws.ts, so counsel reviews exactly what the site will use.
 *
 * Run with: npm run report:state-laws
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stateLaws } from '../src/data/state-laws.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'docs', 'STATE_LAW_REVIEW.md');

const label = { identified: 'Law identified', unconfirmed: 'Unconfirmed', 'none-found': 'None found' };
const count = (status) => stateLaws.filter((s) => s.status === status).length;
const cell = (text = '') => text.replace(/\|/g, '\\|').replace(/\n/g, ' ');

const lines = [
  '# State mugshot law review',
  '',
  '> Generated from `src/data/state-laws.ts` by `npm run report:state-laws`. Do not edit by hand.',
  '>',
  '> **Unverified research.** Compiled from web research in October 2026. Every entry must be',
  '> checked against the current official code by counsel. Mark an entry `reviewed: true` in the',
  '> data file only after review; Phase 3 state pages will not publish unreviewed entries.',
  '',
  `**${count('identified')}** law identified · **${count('unconfirmed')}** unconfirmed · **${count('none-found')}** none found · **${stateLaws.filter((s) => s.reviewed).length}/50** reviewed`,
  '',
  '"None found" means our research did not identify a mugshot-specific law. It is not a statement that none exists.',
  '',
  '| State | Status | Citation | Year | Reviewed |',
  '| --- | --- | --- | --- | --- |',
  ...stateLaws.map((s) => `| [${s.name}](#${s.slug}) | ${label[s.status]} | ${cell(s.citation ?? '—')} | ${s.year ?? '—'} | ${s.reviewed ? 'Yes' : 'No'} |`),
  '',
];

for (const s of stateLaws) {
  lines.push(`## ${s.name}`, '');
  lines.push(`- **Status:** ${label[s.status]}`);
  if (s.citation) lines.push(`- **Citation:** ${s.citation}${s.year ? ` (${s.year})` : ''}`);
  if (s.summary) lines.push(`- **Summary:** ${s.summary}`);
  if (s.notes) lines.push(`- **Open questions:** ${s.notes}`);
  if (s.sources.length) lines.push(`- **Sources:** ${s.sources.map((u) => `<${u}>`).join(', ')}`);
  if (s.localContent?.length) {
    lines.push('- **Draft page copy (review with the entry):**', '');
    for (const p of s.localContent) lines.push(`  > ${p}`, '  >');
    lines.pop();
    lines.push('');
  }
  lines.push(`- **Reviewed by counsel:** ${s.reviewed ? 'Yes' : 'No'}`, '');
}

await fs.writeFile(OUT, lines.join('\n'));
console.log(`Wrote ${path.relative(ROOT, OUT)}`);
