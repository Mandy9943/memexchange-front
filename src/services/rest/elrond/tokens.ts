import { IElrondToken } from '@/types/scTypes';
import mxApi from '.';

export const fetchTokenById = async (
  identifier: string
): Promise<IElrondToken> => {
  const res = await mxApi.get<IElrondToken>(`/tokens/${identifier}`);
  return res.data;
};

export const getFromAllTokens = async ([
  ,
  {
    size = 10000,
    name = undefined,
    identifier = undefined,
    identifiers = undefined,
    search = undefined
  }
]) => {
  return await mxApi.get<IElrondToken[]>('/tokens', {
    params: {
      identifier,
      identifiers,
      name,
      size,
      search
    }
  });
};

export const getTokens = async (address: string, size?: number) => {
  return await mxApi.get(`/accounts/${address}/tokens?size=${size || 200}`);
};
