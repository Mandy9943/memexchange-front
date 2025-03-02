import { fetchElrondEconomics } from '@/services/rest/elrond/network';
import { getFromAllTokens } from '@/services/rest/elrond/tokens';
import { IElrondToken } from '@/types/scTypes';
import useSWR from 'swr';

const useGetMultipleElrondTokens = (tokensIdentifiers: string[]) => {
  const isEgldonTokens = tokensIdentifiers.includes('EGLD');
  const {
    data,
    error,
    isLoading: esdtLoading
  } = useSWR(
    tokensIdentifiers.length !== 0
      ? [
          'tokens',
          {
            identifiers: tokensIdentifiers.join(',')
          }
        ]
      : null,
    getFromAllTokens
  );

  const {
    data: egldData,
    error: egldError,
    isLoading: egldLoading
  } = useSWR(
    {
      identifier: isEgldonTokens ? '/economics' : null
    },
    fetchElrondEconomics
  );

  const finalData: IElrondToken[] = data?.data ? [...data?.data] : [];
  if (isEgldonTokens) {
    if (egldData) {
      if (finalData.findIndex((item) => item.identifier === 'EGLD') === -1) {
        finalData.unshift({
          type: 'FungibleESDT',
          identifier: 'EGLD',
          name: 'EGLD',
          ticker: 'EGLD',
          decimals: 18,
          assets: {
            svgUrl: 'assets/img/egld.svg'
          },
          burnt: '0',
          initialMinted: '0',

          price: egldData.price,
          marketCap: egldData.marketCap,
          supply: egldData.totalSupply,
          circulatingSupply: egldData.circulatingSupply
        });
      }
    }
  }

  return {
    tokens: finalData || [],
    isLoading: esdtLoading || egldLoading,
    isError: error || egldError
  };
};

export default useGetMultipleElrondTokens;
