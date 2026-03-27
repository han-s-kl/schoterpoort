import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const blocks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blocks' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['warning', 'info', 'neutral']),
    visible: z.boolean().default(true),
    order: z.number().default(0),
  }),
});

const blocksEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blocks-en' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['warning', 'info', 'neutral']),
    visible: z.boolean().default(true),
    order: z.number().default(0),
  }),
});

const pagesEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages-en' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { pages, blocks, 'pages-en': pagesEn, 'blocks-en': blocksEn };
