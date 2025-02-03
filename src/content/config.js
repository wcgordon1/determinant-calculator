import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional()
  })
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    steps: z.array(z.object({
      name: z.string(),
      text: z.string(),
      image: z.string().optional()
    })).optional(),
    equation: z.string().optional(),
    draft: z.boolean().optional()
  })
});

export const collections = { blog, guides }; 