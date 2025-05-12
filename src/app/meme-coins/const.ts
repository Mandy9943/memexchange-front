import { environment } from '@/config';

export const trendingBondingAddress =
  (environment as unknown) === 'devnet'
    ? 'erd1qqqqqqqqqqqqqpgq784lvgns80an5qp62khwgw6fjc4u5vy3pl6sylujk7'
    : 'erd1qqqqqqqqqqqqqpgq8n7gkr2pc0wm5fuq9dx98cspysyxxy5cpl6sawpywc';
