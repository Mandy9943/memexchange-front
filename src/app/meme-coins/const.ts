import { environment } from '@/config';

export const trendingBondingAddress =
  (environment as unknown) === 'devnet'
    ? 'erd1qqqqqqqqqqqqqpgq784lvgns80an5qp62khwgw6fjc4u5vy3pl6sylujk7'
    : 'erd1qqqqqqqqqqqqqpgqus5p5gh09p43g8ng9qx0mw00g2z8cc38pl6smg8jk8';
