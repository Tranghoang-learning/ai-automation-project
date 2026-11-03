// Validates the skill 2 artifacts for one story.
// Usage: npm run validate:tc -- <KEY>
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const HEADER = ['Test ID', 'Test Summary', 'Precondition', 'Steps', 'Expected Result', 'Priority'];

// Dynamic import works whether the cucumber packages ship CJS or ESM.
async function loadGherkin() {
  const g = await import('@cucumber/gherkin');
  const m = await import('@cucumber/messages');
  return {
    G: g.Parser ? g : g.default,
    M: m.IdGenerator ? m : m.default,
  };
}

function finish(errors, summary) {
  if (errors.length) {
    console.error(`FAILED (${errors.length} error${errors.length > 1 ? 's' : ''}):`);
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }
  console.log(`OK: ${summary}`);
  process.exit(0);
}

async function main() {
  const key = process.argv[2];
  if (!key || !/^[A-Z][A-Z0-9]*-\d+$/.test(key)) {
    console.error('Usage: npm run validate:tc -- <KEY>   (e.g. SCRUM-12)');
    process.exit(2);
  }
  const errors = [];
  const err = (m) => errors.push(m);

  const dir = path.join('qa-artifacts', 'stories', key);
  const csvPath = path.join(dir, `${key}-manual-test-cases.csv`);
  const featPath = path.join('features', `${key}.feature`);
  const covPath = path.join(dir, `${key}-coverage.md`);
  const anaPath = path.join(dir, `${key}-analysis.md`);

  for (const p of [csvPath, featPath, covPath, anaPath]) {
    if (!fs.existsSync(p)) err(`Missing file: ${p}`);
  }
  if (errors.length) return finish(errors);

  // ---- CSV ----
  const csv = new Map(); // id -> priority
  let rows = [];
  try {
    rows = parse(fs.readFileSync(csvPath, 'utf8'), { bom: true, skip_empty_lines: true });
  } catch (e) {
    err(`CSV parse error: ${e.message}`);
  }
  if (rows.length) {
    if (JSON.stringify(rows[0]) !== JSON.stringify(HEADER)) {
      err(`CSV header mismatch. Expected: ${HEADER.join(',')} | Found: ${rows[0].join(',')}`);
    }
    const idRe = new RegExp(`^TC-${key}-\\d{2,}$`);
    rows.slice(1).forEach((r, i) => {
      const n = i + 1; // data record number
      const [id, summary, , steps, expected, prio] = r.map((c) => c.trim());
      if (!idRe.test(id)) err(`CSV record ${n}: invalid Test ID "${id}" (expected TC-${key}-nn)`);
      if (csv.has(id)) err(`CSV record ${n}: duplicate Test ID ${id}`);
      if (!summary) err(`CSV record ${n} (${id}): empty Test Summary`);
      if (!steps) err(`CSV record ${n} (${id}): empty Steps`);
      if (!expected) err(`CSV record ${n} (${id}): empty Expected Result`);
      if (!/^P[123]$/.test(prio)) err(`CSV record ${n} (${id}): Priority must be P1|P2|P3, found "${prio}"`);
      csv.set(id, prio);
    });
  }

  // ---- Feature (syntax + tags) ----
  const feat = new Map(); // id -> priority tag
  try {
    const { G, M } = await loadGherkin();
    const parser = new G.Parser(new G.AstBuilder(M.IdGenerator.uuid()), new G.GherkinClassicTokenMatcher());
    const doc = parser.parse(fs.readFileSync(featPath, 'utf8'));
    if (!doc.feature) {
      err('Feature file has no Feature');
    } else {
      const scenarios = [];
      const walk = (children, inherited) => {
        for (const c of children) {
          if (c.scenario) scenarios.push({ s: c.scenario, inherited });
          if (c.rule) walk(c.rule.children, [...inherited, ...(c.rule.tags || []).map((t) => t.name)]);
        }
      };
      walk(doc.feature.children, doc.feature.tags.map((t) => t.name));

      const tcRe = new RegExp(`^@TC-${key}-\\d{2,}$`);
      for (const { s, inherited } of scenarios) {
        const tags = [...inherited, ...s.tags.map((t) => t.name)];
        const where = `Scenario "${s.name}" (line ${s.location.line})`;

        if (!tags.includes(`@${key}`)) err(`${where}: missing @${key}`);

        const tcs = tags.filter((t) => t.startsWith('@TC-'));
        if (tcs.length !== 1) {
          err(`${where}: needs exactly one @TC- tag, found ${tcs.length}`);
        } else if (!tcRe.test(tcs[0])) {
          err(`${where}: bad TC tag ${tcs[0]} (expected @TC-${key}-nn)`);
        } else {
          const id = tcs[0].slice(1);
          if (feat.has(id)) err(`${where}: ${id} is used by more than one scenario (must be 1:1)`);
          const prios = tags.filter((t) => /^@P[123]$/.test(t));
          if (prios.length !== 1) err(`${where}: needs exactly one @P1|@P2|@P3 tag, found ${prios.length}`);
          feat.set(id, prios[0] ? prios[0].slice(1) : undefined);
        }

        if (/outline|template/i.test(s.keyword) && s.examples.length === 0) {
          err(`${where}: Scenario Outline without Examples`);
        }
        for (const ex of s.examples) {
          const cols = (ex.tableHeader ? ex.tableHeader.cells : []).map((c) => c.value);
          if (!cols.includes('case')) err(`${where}: Examples table needs a "case" column`);
        }
      }
      if (scenarios.length === 0) err('Feature file has no scenarios');
    }
  } catch (e) {
    err(`Gherkin error: ${e.message}`);
  }

  // ---- Cross-check feature <-> CSV ----
  for (const id of csv.keys()) {
    if (!feat.has(id)) err(`${id}: in CSV but no scenario with that @TC- tag (manual-only cases need a @manual scenario)`);
  }
  for (const [id, prio] of feat) {
    if (!csv.has(id)) err(`${id}: in feature but not in CSV`);
    else if (prio && csv.get(id) !== prio) err(`${id}: priority mismatch (tag ${prio}, CSV ${csv.get(id)})`);
  }

  // ---- Coverage report ----
  const cov = fs.readFileSync(covPath, 'utf8');
  if (!/Status:\s*\**\s*(Draft|Approved)/i.test(cov)) err(`${covPath}: missing "Status: Draft|Approved"`);
  for (const id of csv.keys()) {
    if (!cov.includes(id)) err(`${id}: missing from coverage report`);
  }
  const acs = new Set(fs.readFileSync(anaPath, 'utf8').match(/\bAC-\d+\b/g) || []);
  for (const ac of acs) {
    if (!cov.includes(ac)) err(`${ac}: in analysis but missing from coverage report (must be Covered or Blocked)`);
  }

  finish(errors, `${csv.size} test case(s), ${feat.size} scenario(s), ${acs.size} AC(s) accounted for in ${key}`);
}

main().catch((e) => {
  console.error(`Validator crashed: ${e.stack || e.message}`);
  process.exit(2);
});