import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stateLaws } from '../src/data/state-laws.ts';

test('covers exactly the 50 states, once each', () => {
  assert.equal(stateLaws.length, 50);
  assert.equal(new Set(stateLaws.map((s) => s.abbr)).size, 50);
  assert.equal(new Set(stateLaws.map((s) => s.slug)).size, 50);
});

test('slugs are URL-safe', () => {
  for (const s of stateLaws) assert.match(s.slug, /^[a-z]+(-[a-z]+)*$/, s.name);
});

test('every identified law has a citation, summary and source', () => {
  for (const s of stateLaws.filter((st) => st.status === 'identified')) {
    assert.ok(s.citation, `${s.name}: citation`);
    assert.ok(s.summary, `${s.name}: summary`);
    assert.ok(s.sources.length > 0, `${s.name}: source`);
  }
});

test('every unconfirmed entry explains what is unconfirmed', () => {
  for (const s of stateLaws.filter((st) => st.status === 'unconfirmed')) assert.ok(s.notes, s.name);
});

test('sources are https URLs', () => {
  for (const s of stateLaws) for (const u of s.sources) assert.match(u, /^https:\/\/\S+$/, `${s.name}: ${u}`);
});
