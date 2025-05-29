import { fetchTransfers } from '@/services/rest/elrond/transactions';
import { timeStampToSeconds } from '@/utils/mx-utils';
import { useFormContext } from 'react-hook-form';
import useSWR from 'swr';
import { IFormValues } from '../common/FormikContainer/FormikContainer';
import { formatPaymentTableData } from './functions';

export const useGetPayments = () => {
  const { getValues } = useFormContext<IFormValues>();

  const { data, isLoading, error } = useSWR(
    getValues().receiver
      ? [
          `/api/payments`,
          getValues().receiver,
          getValues().sender,
          getValues().from.toLocaleDateString(),
          getValues().to.toLocaleDateString(),
          getValues().type
        ]
      : null,
    async () => {
      let txfunction;
      switch (getValues().type) {
        case 'all':
          txfunction = undefined;
          break;
        case 'egld':
          txfunction = 'transfer';
          break;
        case 'esdt':
          txfunction = 'ESDTTransfer';
          break;
        default:
          break;
      }

      return fetchTransfers({
        receiver: getValues().receiver || undefined,
        sender: getValues().sender || undefined,
        after: timeStampToSeconds(getValues().from.getTime()),
        before: timeStampToSeconds(getValues().to.getTime()),
        function: txfunction,
        status: 'success',
        size: 10000
      });
    }
  );

  return {
    payments: formatPaymentTableData(data || []),
    isLoading,
    error
  };
};
