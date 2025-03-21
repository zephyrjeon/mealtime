import { z } from 'zod';

export const menuItemEntity = z.object({
  id: z.string(),
  mercahntId: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  images: z.array(z.string()).optional(),
});

export type MenuItemEntity = z.infer<typeof menuItemEntity>;
