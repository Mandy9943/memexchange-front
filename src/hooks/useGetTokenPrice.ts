import useGetElrondToken from './useGetElrondToken';
const useGetTokenPrice = (tokenIdentifier: string | null) => {
  const { elrondToken } = useGetElrondToken(tokenIdentifier);
  let tokenPrice = 0;

  if (elrondToken) {
    tokenPrice = elrondToken.price;
  }

  return [tokenPrice];
};

export default useGetTokenPrice;
