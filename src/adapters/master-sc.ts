import { IBoundingData, ISCBoundingData } from '@/types/masterScTypes';

export const adaptAllBondingData = (
  data: ISCBoundingData[]
): IBoundingData[] => {
  return data
    .map((item) => {
      const address = item.sc_address.bech32();
      const firstTokenId = item.first_token_id;
      const secondTokenId = item.second_token_id;
      const firstTokenReserve = item.first_token_reserve.toString();
      const secondTokenReserve = item.second_token_reserve.toString();
      const ownerFeePercentage = item.owner_fee_percent.toNumber();
      const marketCap = item.market_cap.toString();
      const state = item.state.name;

      return {
        address,
        firstTokenId,
        secondTokenId,
        firstTokenReserve,
        secondTokenReserve,
        ownerFeePercentage,
        marketCap,

        state
      };
    })
    .reverse();
};
