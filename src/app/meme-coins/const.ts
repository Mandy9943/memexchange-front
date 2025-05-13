import { environment } from '@/config';

export const trendingBondingAddress =
  (environment as unknown) === 'devnet'
    ? 'erd1qqqqqqqqqqqqqpgq784lvgns80an5qp62khwgw6fjc4u5vy3pl6sylujk7'
    : 'erd1qqqqqqqqqqqqqpgq0m9m5rhrr0efch3j3a0mxsp93mahf4y0pl6sq0ed08';
