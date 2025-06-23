
import { z } from 'zod';

export const QuoteResponseSchema = z.object({
  inputMint: z.string(),
  inAmount: z.string(),
  outputMint: z.string(),
  outAmount: z.string(),
  otherAmountThreshold: z.string(),
  swapMode: z.string(),
  slippageBps: z.number(),
  platformFee: z.any().optional(),
  priceImpactPct: z.string(),
  routePlan: z.array(z.any()),
});

export const SwapResponseSchema = z.object({
  swapTransaction: z.string(),
  lastValidBlockHeight: z.number().optional(),
  prioritizationFeeLamports: z.number().optional(),
});

export const TokenInfoSchema = z.object({
  address: z.string(),
  name: z.string().optional(),
  symbol: z.string().optional(),
  decimals: z.number(),
  logoURI: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type QuoteResponse = z.infer<typeof QuoteResponseSchema>;
export type SwapResponse = z.infer<typeof SwapResponseSchema>;
export type TokenInfo = z.infer<typeof TokenInfoSchema>;
