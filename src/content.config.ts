/**
 * Resources collection: one Markdown file per article in
 * src/content/resources/. The filename is the URL slug.
 *
 * Articles are bylined to the company, never to an invented person. Follow
 * the copy rules in PROJECT_CONTEXT.md: no guarantees, no invented
 * statistics, no legal advice. The build's claim check runs on every article.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const RESOURCE_CATEGORIES = ['mugshots', 'search-results', 'privacy', 'reviews'] as const;

const resources = defineCollection({
  loader: glob({ base: './src/content/resources', pattern: '**/*.md' }),
  schema: z.object({
    /** Without the brand suffix, which adds 30 chars; the full title must stay ≤ 65. */
    title: z.string().max(35),
    /** Used on cards and as the meta description (≤ 165 chars). */
    description: z.string().max(165),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.enum(RESOURCE_CATEGORIES),
    /** Slug of the most relevant service in src/data/services.ts. */
    relatedService: z.string(),
  }),
});

export const collections = { resources };
