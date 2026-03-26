import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
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

const newsEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news-en' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { pages, news, blocks, 'pages-en': pagesEn, 'news-en': newsEn, 'blocks-en': blocksEn };
