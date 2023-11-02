import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    categories: z.array(z.string()).default(['others']),
    tags: z.array(z.string()).default(['others']),
    authors: z.array(z.string()).default(['Thomas Legrand']),
  }),
});

const project = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    github: z.string().optional(),
    url: z.string().optional(),
    heroImage: z.string().optional(),
    categories: z.array(z.string()).default(['others']),
    tags: z.array(z.string()).default(['others']),
    authors: z.array(z.string()).default(['Thomas Legrand']),
  }),
});

export const collections = { blog, project };
