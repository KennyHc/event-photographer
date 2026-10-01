import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const eventSchema = z.object({
  title: z.string(),
  location: z.string(),
  date: z.string(),
  summary: z.string(),
  order: z.number(),
  testimonial: z
    .object({
      quote: z.string(),
      author: z.string(),
    })
    .optional(),
});

const eventsEn = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/events/en' }),
  schema: eventSchema,
});

const eventsEs = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/events/es' }),
  schema: eventSchema,
});

export const collections = { eventsEn, eventsEs };
