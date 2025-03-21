import { z } from 'zod';

export const createMenuItemInput = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(2, {
      message: 'Name must be at least 2 characters.',
    }),

  price: z
    .number({
      required_error: 'price is required',
    })
    .min(0, {
      message: 'price must be 0 or higher',
    }),
  description: z.string().optional(),
  images: z.array(z.instanceof(File)).optional(),
});

export type CreateMenuItemInput = z.infer<typeof createMenuItemInput>;
