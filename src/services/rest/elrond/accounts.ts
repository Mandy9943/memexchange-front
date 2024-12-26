import {
  IElrondAccountToken,
  IElrondNFT,
  IElrondUserAccount
} from '@/types/scTypes';
import mxApi from '.';

export const fetchAccountTokenById = async ([identifier, address]: [
  string,
  string
]): Promise<IElrondAccountToken> => {
  const res = await mxApi.get<IElrondAccountToken>(
    `/accounts/${address}/tokens/${identifier}`
  );
  return res.data;
};
export const fetchUserEgldBalance = async (
  address: string
): Promise<IElrondUserAccount> => {
  const res = await mxApi.get<IElrondUserAccount>(
    `/accounts/${address}?fields=balance`
  );
  return res.data;
};

export const fetchUserNfts = async ({
  address,
  parameters
}: {
  address: string;
  parameters?: {
    collections?: string;
    size?: number;
  };
}) => {
  const res = await mxApi.get<IElrondNFT[]>(`/accounts/${address}/nfts`, {
    params: {
      size: parameters?.size || 1000,
      ...parameters
    }
  });
  return res.data;
};
