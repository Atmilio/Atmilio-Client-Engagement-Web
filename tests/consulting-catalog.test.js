const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const context = vm.createContext({});
for (const name of ['consulting-catalog.js', 'consulting-examples.js']) vm.runInContext(fs.readFileSync(path.join(root, name), 'utf8'), context);
const domains = vm.runInContext('consultingDomains', context);
const examples = vm.runInContext('consultingExamples', context);
test('every named system has a relevant work and AI example', () => {
  assert.equal(domains.length, 12);
  for (const domain of domains) {
    const groups = examples[domain.id];
    assert.ok(groups && groups.length, `Missing examples for ${domain.id}`);
    for (const group of groups) assert.ok(group.systems.length && group.work && group.ai, `Incomplete example in ${domain.id}`);
    for (const system of domain.systems) assert.equal(groups.filter(group => group.systems.includes(system)).length, 1, `${domain.id}: ${system}`);
    for (const group of groups) for (const system of group.systems) assert.ok(domain.systems.includes(system), `Unexpected ${system}`);
  }
});