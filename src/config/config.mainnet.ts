import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

export * from './sharedConfig';

export const API_URL = 'https://template-api.multiversx.com';
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.mainnet;

export const network = {
  id: 'mainnet',
  name: 'Mainnet',
  egldLabel: 'EGLD',
  walletAddress: 'https://wallet.multiversx.com',
  apiAddress:
    process.env.NEXT_PUBLIC_ELROND_API || 'https://api.multiversx.com',
  gatewayAddress: 'https://gateway.multiversx.com',
  explorerAddress: 'http://explorer.multiversx.com',
  graphQlAddress: 'https://exchange-graph.multiversx.com/graphql',
  apiTimeout: 10000,
  walletConnectBridgeAddresses: ['https://bridge.walletconnect.org']
};

export const scAddress = {
  wrapEGLDShard0:
    'erd1qqqqqqqqqqqqqpgqpv09kfzry5y4sj05udcngesat07umyj70n4sa2c0rp',
  wrapEGLDShard1:
    'erd1qqqqqqqqqqqqqpgqpv09kfzry5y4sj05udcngesat07umyj70n4sa2c0rp',
  wrapEGLDShard2:
    'erd1qqqqqqqqqqqqqpgqpv09kfzry5y4sj05udcngesat07umyj70n4sa2c0rp',
  degenMaster: 'erd1qqqqqqqqqqqqqpgqv9ru0egzzuweqrfc6d6fuzem29fztwkfpl6s3zu7tx'
};

export const ChainID = '1';

export const tokensID = {
  egld: 'EGLD',
  wegld: 'WEGLD-bd4d79',
  usdc: 'USDC-c76f1f'
};
