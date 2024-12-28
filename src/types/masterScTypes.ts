import { Address } from '@/utils';
import BigNumber from 'bignumber.js';

export type CoinBondingState =
  | 'Inactive'
  | 'Active'
  | 'PartialActive'
  | 'PendingAddLiquidity'
  | 'Finished';

export interface ISCBoundingData {
  sc_address: Address;
  first_token_id: string;
  second_token_id: string;
  first_token_reserve: BigNumber;
  second_token_reserve: BigNumber;
  owner_fee_percent: BigNumber;
  market_cap: BigNumber;
  state: { name: CoinBondingState; fields: unknown[] };
}

export interface IBoundingData {
  address: string;
  firstTokenId: string;
  secondTokenId: string;
  firstTokenReserve: string;
  secondTokenReserve: string;
  ownerFeePercentage: number;
  marketCap: string;
  state: CoinBondingState;
}
