#!/usr/bin/env node
// Post-build: rewrite hardcoded /schoterpoort/ paths in dist/ output to the
// target-specific prefix. This handles ALL hardcoded /schoterpoort/ strings
// in the markdown content (images, documents, and internal page links like
// /schoterpoort/soa that were baked in by content authors).
//
// Astro's own `base` config already rewrites the path on routing-owned paths
// (nav, layouts, sitemap). This script catches only what's inside markdown
// content, which Astro leaves literal.
//
// Usage: node scripts/rewrite-base-path.mjs <target>
//   transip -> strip "/schoterpoort" prefix entirely
//   staging -> replace with "/staging"

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const target = process.argv[2];
if (!target || !['transip', 'staging'].includes(target)) {
  console.error('Usage: node scripts/rewrite-base-path.mjs <transip|staging>');
  process.exit(1);
}

const FROM = '/schoterpoort/';
const TO = target === 'staging' ? '/staging/' : '/';

const DIST = new URL('../dist/', import.meta.url).pathname;
const EXTS = new Set(['.html', '.xml']); // HTML pages + sitemap

async function* walk(dir) {
  for (const entry of await readdir(dir)) {
    const path = join(dir, entry);
    const s = await stat(path);
    if (s.isDirectory()) yield* walk(path);
    else if (EXTS.has(extname(entry))) yield path;
  }
}

let filesTouched = 0;
let totalReplacements = 0;
for await (const file of walk(DIST)) {
  const content = await readFile(file, 'utf8');
  const parts = content.split(FROM);
  if (parts.length > 1) {
    totalReplacements += parts.length - 1;
    await writeFile(file, parts.join(TO));
    filesTouched++;
  }
}

console.log(`[rewrite-base-path] target=${target} touched=${filesTouched} replacements=${totalReplacements}`);
