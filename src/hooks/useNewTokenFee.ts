import { fetchNewTokenFee } from '@/services/sc/degen_master/queries';
import { formatBalance } from '@/utils/mx-utils';
import useSWR from 'swr';

const useNewTokenFee = () => {
  const {
    data: newTokenFee,
    isLoading,
    error
  } = useSWR('master:getNewTokenFee', fetchNewTokenFee);

  return {
    newTokenFeeValue: newTokenFee,
    newTokenFeeString: formatBalance({ balance: newTokenFee, decimals: 18 }),
    isLoading,
    error
  };
};

export default useNewTokenFee;
