import { fetchAxios } from '.';

export interface Trade {
  type: 'buy' | 'sell';
  address: string;
  amount: string;
  timestamp: number;
}

interface PaginatedResponse {
  data: Trade[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export const getTokenTrades = (
  tokenId: string,
  page: number = 1,
  limit: number = 10
) => {
  return fetchAxios<PaginatedResponse>(
    `/swaps/token/${tokenId}?page=${page}&limit=${limit}`
  );
};
