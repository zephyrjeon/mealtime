import { z } from 'zod';

export const merchantEntity = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  userId: z.string(),
  cuisines: z.string().optional(),
  image: z.string().optional(),
  menu: z.array(z.string()).optional(),
});

export type MerchantEntity = z.infer<typeof merchantEntity>;
