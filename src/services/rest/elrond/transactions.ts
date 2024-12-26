import { ISortOrder, ITransaction, ITransactionStatus } from '@/types/scTypes';
import mxApi from '.';

export interface IFetchTransactionParams {
  from?: number;
  size?: number;
  sender?: string;
  receiver?: string;
  token?: string;
  senderShard?: number;
  receiverShard?: number;
  miniBlockHash?: string;
  hashes?: string;
  status?: ITransactionStatus;
  function?: string;
  before?: number;
  after?: number;
  order?: ISortOrder;
  fields?: string;
  withScResults?: boolean;
  withOperations?: boolean;
  withLogs?: boolean;
  withScamInfo?: boolean;
  withUsername?: boolean;
  withBlockInfo?: boolean;
}
export const fetchTransactions = async (
  params?: IFetchTransactionParams
): Promise<ITransaction[]> => {
  const res = await mxApi.get<ITransaction[]>('/transactions', {
    params: params
  });
  return res.data;
};

export const fetchTransactionByHash = async (
  txHash: string
): Promise<ITransaction> => {
  const res = await mxApi.get<ITransaction>(`/transactions/${txHash}`);
  return res.data;
};

export const fetchTransfers = async (
  params?: IFetchTransactionParams
): Promise<ITransaction[]> => {
  const res = await mxApi.get<ITransaction[]>('/transfers', {
    params: params
  });
  return res.data;
};
