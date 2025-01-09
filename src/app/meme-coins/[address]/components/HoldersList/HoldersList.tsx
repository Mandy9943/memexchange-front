import { network } from '@/config';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { fetchElrondData } from '@/services/rest/elrond';
import { formatAddress, formatNumber } from '@/utils/mx-utils';
import BigNumber from 'bignumber.js';
import { memo } from 'react';
import useSWR from 'swr';
import { getBalancePercentage } from './helper';

const HoldersList = ({
  tokenIdentifier,
  contractAddress
}: {
  tokenIdentifier: string;
  contractAddress: string;
}) => {
  const { data: holders } = useSWR<
    {
      address: string;
      balance: string;
    }[]
  >(`/tokens/${tokenIdentifier}/accounts`, fetchElrondData);

  const { elrondToken } = useGetElrondToken(tokenIdentifier);

  const totalBalance = new BigNumber(elrondToken?.initialMinted || 0).minus(
    elrondToken?.burnt || 0
  );

  if (!holders) return null;
  return (
    <div className='bg-gray-800 rounded-lg p-4'>
      <h2 className='text-lg font-semibold mb-3'>
        Total Holders: {holders.length}
      </h2>
      <div className='space-y-2'>
        {holders.map((h) => {
          const percent = getBalancePercentage(
            holders,
            h.address,
            totalBalance.toString()
          );

          return (
            <div key={h.address} className='flex justify-between'>
              <a
                href={`${network.explorerAddress}/accounts/${h.address}`}
                target='_blank'
                rel='noopener noreferrer'
                className='text-green-400'
              >
                {contractAddress === h.address ? (
                  '(Bonding Curve)'
                ) : (
                  <span className='truncate'>
                    {formatAddress(h.address, 6, 4)}
                  </span>
                )}
              </a>
              <div>
                <span className='text-green-400'>
                  {formatNumber(
                    new BigNumber(h.balance).dividedBy(10 ** 18).toNumber()
                  )}
                </span>
                <span className='text-gray-400 ml-2'>
                  {formatNumber(percent.toNumber())}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(HoldersList);
