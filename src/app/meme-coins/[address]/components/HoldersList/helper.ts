// receive an array like
//  [
//   {
//     "address": "erd1twpgwyu2hd0jrx3q2uypum8vwhgvm2jvl66nswq0lk9fe37xkddqkp92v0",
//     "balance": "34998999999999999999500000"
//   },
//   {
//     "address": "erd1qqqqqqqqqqqqqpgq4f7yfcrshk8v5z96aqea4e4ljqap7vmkd8sstnzfgs",
//     "balance": "1000000000000000500000"
//   }
// ]
// and an address and return the % of total balance belongs to that address in the array

import BigNumber from 'bignumber.js';

interface HolderData {
  address: string;
  balance: string;
}

export function getBalancePercentage(
  holders: HolderData[],
  address: string,
  totalBalance: string
): BigNumber {
  const holderBalance = holders.find((holder) => holder.address === address)
    ?.balance;

  if (!holderBalance) {
    return new BigNumber(0);
  }

  const balancePercentage = new BigNumber(holderBalance)
    .multipliedBy(100)
    .div(totalBalance);

  return balancePercentage;
}
