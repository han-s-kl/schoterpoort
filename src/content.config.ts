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

export const collections = { pages, news, 'pages-en': pagesEn, 'news-en': newsEn };
