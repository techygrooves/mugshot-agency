import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stateNeighbors } from '../src/data/state-neighbors.ts';
import { stateLaws } from '../src/data/state-laws.ts';

test('has an entry for every state', () => {
  assert.deepEqual(Object.keys(stateNeighbors).sort(), stateLaws.map((s) => s.abbr).sort());
});

test('borders are symmetric and never self-referencing', () => {
  for (const [abbr, list] of Object.entries(stateNeighbors)) {
    for (const n of list) {
      assert.notEqual(n, abbr);
      assert.ok(stateNeighbors[n]?.includes(abbr), `${abbr} lists ${n}, but ${n} does not list ${abbr}`);
    }
  }
});
