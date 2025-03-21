import { z } from 'zod';

export const createMerchantInput = z.object({
  userId: z.string(),
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(2, {
      message: 'Name must be at least 2 characters.',
    }),
  address: z
    .string({
      required_error: 'address is required',
    })
    .min(2, {
      message: 'address must be at least 2 characters.',
    }),
  phoneNumber: z
    .string({
      required_error: 'phoneNumber is required',
    })
    .min(2, {
      message: 'phoneNumber must be at least 2 characters.',
    }),
  cuisines: z.string().optional(),
  image: z.instanceof(File).optional(),
});

export type CreateMerchantInput = z.infer<typeof createMerchantInput>;
