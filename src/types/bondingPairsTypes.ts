export interface User {
  id: number;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coin {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  bondingPairId: number;
}

export interface BondingPair {
  id: number;
  address: string;
  firstToken: string;
  secondToken: string;
  creatorId: number;
  createdAt: string;
  updatedAt: string;
  state: string;
  coinId: number | null;
  creator: User;
  coin: Coin | null;
}
