const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SPEC = path.join(ROOT, '.github', 'PROJECT_SPEC.md');
const OUT_DIR = path.join(ROOT, 'test-results');
const OUT_FILE = path.join(OUT_DIR, 'structure-report.json');

function readSpec() {
  if (!fs.existsSync(SPEC)) {
    throw new Error(`Spec not found at ${SPEC}`);
  }
  return fs.readFileSync(SPEC, 'utf8');
}

function extractPaths(specText) {
  const set = new Set();

  // 1) Extract explicit "// filepath: ..." lines (handles absolute Windows paths too)
  const fpRegex = /\/\/\s*filepath:\s*([^\n\r]+)/g;
  for (let m; (m = fpRegex.exec(specText)); ) {
    const raw = m[1].trim();
    const lastSrc = raw.lastIndexOf('src/');
    if (lastSrc !== -1) {
      set.add(raw.slice(lastSrc));
    } else {
      // fallback: use basename if it's clearly a file path with extension
      const base = path.basename(raw);
      if (base.includes('.')) set.add(base);
    }
  }

  // 2) Extract all occurrences of src/.../*.ts, .js, .json, .yml, .yaml, .md
  const generalRegex = /\b(?:src|tests|docs|scripts|docker|database|test-data|.github)\/[A-Za-z0-9_\-\/\.]+\.(?:ts|js|json|yml|yaml|md|sql|sh)\b/g;
  for (const m of specText.matchAll(generalRegex)) {
    set.add(m[0]);
  }

  // 3) Also extract top-level files referenced like package.json, tsconfig.json
  const topRegex = /\b(package\.json|tsconfig\.json|playwright\.config\.ts|README\.md|\.env\.example|docker-compose\.yml|Dockerfile)\b/g;
  for (const m of specText.matchAll(topRegex)) set.add(m[1]);

  return Array.from(set).sort();
}

function normalizeRepoPath(p) {
  // If path seems absolute with drive letter, reduce to last occurrence of 'src/' or other known root
  if (/^[A-Za-z]:\\/.test(p) || p.startsWith('/')) {
    const idx = p.lastIndexOf('src/');
    if (idx !== -1) return p.slice(idx).replace(/\\/g, '/');
    const idx2 = p.lastIndexOf('.github/');
    if (idx2 !== -1) return p.slice(idx2).replace(/\\/g, '/');
    // otherwise, fallback to basename
    return path.basename(p);
  }
  return p.replace(/\\/g, '/');
}

function checkFiles(paths) {
  const present = [];
  const missing = [];
  for (const rp of paths) {
    const rel = normalizeRepoPath(rp);
    const abs = path.join(ROOT, rel);
    if (fs.existsSync(abs)) present.push(rel); else missing.push(rel);
  }
  return { present, missing };
}

function saveReport(report) {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(report, null, 2), 'utf8');
}

function main() {
  try {
    const specText = readSpec();
    const expected = extractPaths(specText);
    const result = checkFiles(expected);
    const summary = {
      timestamp: new Date().toISOString(),
      expectedCount: expected.length,
      presentCount: result.present.length,
      missingCount: result.missing.length,
      present: result.present,
      missing: result.missing,
    };
    console.log('Project structure verification summary:');
    console.log(`  expected: ${summary.expectedCount}`);
    console.log(`  present : ${summary.presentCount}`);
    console.log(`  missing : ${summary.missingCount}`);
    if (summary.missing.length) {
      console.log('Missing files (first 50):');
      console.log(summary.missing.slice(0, 50).join('\n'));
    } else {
      console.log('All extracted spec paths are present (based on spec parsing).');
    }
    saveReport(summary);
    // exit non-zero if missing files
    process.exit(summary.missingCount > 0 ? 2 : 0);
  } catch (err) {
    console.error('Error during structure verification:', err);
    process.exit(1);
  }
}

if (require.main === module) main();
module.exports = { extractPaths, normalizeRepoPath, checkFiles };