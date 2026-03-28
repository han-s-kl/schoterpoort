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

  try {
    let enContent;
    if (isJSON) {
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
