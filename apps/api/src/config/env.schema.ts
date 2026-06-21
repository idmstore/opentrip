import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default('15m'),
  TRIPAY_MERCHANT_CODE: z.string().optional(),
  TRIPAY_API_KEY: z.string().optional(),
  TRIPAY_PRIVATE_KEY: z.string().optional(),
  TRIPAY_CALLBACK_SECRET: z.string().optional(),
  ONESENDER_BASE_URL: z.string().url().optional(),
  ONESENDER_API_KEY: z.string().optional(),
  WEB_URL: z.string().url(),
  ADMIN_URL: z.string().url()
});

export type Env = z.infer<typeof envSchema>;
