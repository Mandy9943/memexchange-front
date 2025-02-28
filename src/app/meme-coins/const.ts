import { environment } from '@/config';

export const trendingBondingAddress =
  (environment as unknown) === 'devnet'
    ? 'erd1qqqqqqqqqqqqqpgq784lvgns80an5qp62khwgw6fjc4u5vy3pl6sylujk7'
    : 'erd1qqqqqqqqqqqqqpgq92xhfs96z6xjaanpecafuavyuj5hku5wpl6sge4lfh';
