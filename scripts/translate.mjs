import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { basename, dirname } from 'path';

const client = new Anthropic();

const SYSTEM_PROMPT = `You are a professional translator for a Dutch GP practice (huisartsenpraktijk) website. Translate Dutch to English.

Rules:
- Use formal but accessible English appropriate for a medical practice website
- Preserve ALL HTML tags (<strong>, <a href="...">, <br>, etc.) exactly as they are -- only translate the text content
- Preserve ALL CSS classes, URLs, phone numbers, and email addresses exactly
- Preserve markdown formatting (bold, links, tables, headings)
- Do not translate proper nouns (practice names like "Praktijk Louwet", doctor names, "Schoterpoort", "UwZorgOnline")
- Do not translate "NPA" (it's an accreditation acronym)
- Medical terms should use standard English equivalents
- Return ONLY the translated content, no explanations`;

function getEnPath(nlPath) {
  // src/data/staff.json -> same file (EN fields are inline)
  if (nlPath === 'src/data/staff.json') {
    return nlPath;
  }
  // src/data/home.json -> src/data/home-en.json
  if (nlPath.startsWith('src/data/') && nlPath.endsWith('.json')) {
    return nlPath.replace('.json', '-en.json');
  }
  // src/content/pages/x.md -> src/content/pages-en/x.md
  if (nlPath.startsWith('src/content/pages/')) {
    return nlPath.replace('src/content/pages/', 'src/content/pages-en/');
  }
  // src/content/blocks/x.md -> src/content/blocks-en/x.md
  if (nlPath.startsWith('src/content/blocks/')) {
    return nlPath.replace('src/content/blocks/', 'src/content/blocks-en/');
  }
  return null;
}

async function translateJSON(nlContent) {
  const data = JSON.parse(nlContent);

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{
      role: 'user',
      content: `Translate this JSON file from Dutch to English. Keep the exact same JSON structure and keys. Only translate the string values that contain Dutch text. Do NOT translate: URLs, phone numbers, email addresses, CSS classes, HTML attributes, boolean values, numbers, or field names like "visible", "type", "order", "href", "key".

Return ONLY valid JSON, no markdown code fences.

${nlContent}`
    }],
  });

  return response.content[0].text;
}

const STAFF_EN_FIELDS = [
  { nl: 'background', en: 'backgroundEn' },
  { nl: 'interests', en: 'interestsEn' },
  { nl: 'since', en: 'sinceEn' },
  { nl: 'specializations', en: 'specializationsEn' },
];

async function translateStaffJSON(nlContent) {
  const staff = JSON.parse(nlContent);

  // Collect all NL texts that need translation
  const toTranslate = {};
  for (let i = 0; i < staff.length; i++) {
    for (const { nl } of STAFF_EN_FIELDS) {
      const val = staff[i][nl];
      if (!val || (Array.isArray(val) && val.length === 0)) continue;
      const key = `${i}.${nl}`;
      toTranslate[key] = Array.isArray(val) ? val.join(' || ') : val;
    }
  }

  if (Object.keys(toTranslate).length === 0) {
    console.log('No staff fields to translate');
    return nlContent;
  }

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 8192,
    system: SYSTEM_PROMPT,
    messages: [{
      role: 'user',
      content: `Translate these Dutch text values to English. Return a JSON object with the same keys and the translated values. For values that contain " || " separators, translate each part separately and keep the " || " separators.

Do not translate proper nouns (doctor names, practice names like "Praktijk Louwet", "Schoterpoort", "UwZorgOnline"). Keep the first-person voice if the original uses it.

Return ONLY valid JSON, no markdown code fences.

${JSON.stringify(toTranslate, null, 2)}`
    }],
  });

  const translations = JSON.parse(response.content[0].text);

  // Write translations back into staff array
  for (const [key, enValue] of Object.entries(translations)) {
    const [indexStr, nlField] = key.split('.');
    const index = parseInt(indexStr);
    const enField = STAFF_EN_FIELDS.find(f => f.nl === nlField)?.en;
    if (enField === undefined) continue;

    if (nlField === 'specializations') {
      staff[index][enField] = enValue.split(' || ').map(s => s.trim());
    } else {
      staff[index][enField] = enValue;
    }
  }

  return JSON.stringify(staff, null, 2) + '\n';
}

async function translateMarkdown(nlContent) {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{
      role: 'user',
      content: `Translate this markdown file from Dutch to English. The file has YAML frontmatter between --- markers.

Rules:
- Translate the "title" and "description" fields in frontmatter
- Do NOT translate or change: "visible", "type", "order", "layout", or any non-text frontmatter fields
- Translate the markdown body
- Preserve all markdown formatting (headings, bold, links, tables)
- Preserve all URLs, phone numbers, and email addresses
- Return the complete file (frontmatter + body), no markdown code fences

${nlContent}`
    }],
  });

  return response.content[0].text;
}

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node scripts/translate.mjs <nl-file-path>');
    process.exit(1);
  }

  const enPath = getEnPath(filePath);
  if (!enPath) {
    console.error(`Cannot determine EN path for: ${filePath}`);
    process.exit(1);
  }

  if (!existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const nlContent = readFileSync(filePath, 'utf-8');
  const isJSON = filePath.endsWith('.json');

  console.log(`Translating: ${filePath} -> ${enPath}`);

  const isStaff = filePath === 'src/data/staff.json';

  try {
    let enContent;
    if (isStaff) {
      enContent = await translateStaffJSON(nlContent);
    } else if (isJSON) {
      enContent = await translateJSON(nlContent);
      // Validate JSON
      JSON.parse(enContent);
      // Ensure trailing newline
      if (!enContent.endsWith('\n')) enContent += '\n';
    } else {
      enContent = await translateMarkdown(nlContent);
      if (!enContent.endsWith('\n')) enContent += '\n';
    }

    writeFileSync(enPath, enContent);
    console.log(`Written: ${enPath}`);
  } catch (err) {
    console.error(`Translation failed for ${filePath}: ${err.message}`);
    process.exit(1);
  }
}

main();
