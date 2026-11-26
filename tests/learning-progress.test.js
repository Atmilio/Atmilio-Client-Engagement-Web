const test = require('node:test');
const assert = require('node:assert/strict');
global.window = {};
require('../learning-progress-utils.js');
const progress = global.window.learningProgressUtils;

test('completion is idempotent and can be reversed', () => {
  const first = progress.update(null, 'lesson-1', true);
  const repeated = progress.update(first, 'lesson-1', true);
  assert.deepEqual(repeated.completed, ['lesson-1']);
  assert.equal(progress.summarize(repeated, ['lesson-1', 'lesson-2', 'lesson-3']).percent, 33);
  const undone = progress.update(repeated, 'lesson-1', false);
  assert.deepEqual(undone.completed, []);
  assert.deepEqual(first.completed, ['lesson-1']);
});

test('unknown or duplicate stored lessons cannot inflate completion', () => {
  const summary = progress.summarize({ completed: ['lesson-1', 'lesson-1', 'unknown'] }, ['lesson-1', 'lesson-2']);
  assert.deepEqual(summary, { count: 1, total: 2, percent: 50 });
  assert.deepEqual(progress.summarize(null, []), { count: 0, total: 0, percent: 0 });
});