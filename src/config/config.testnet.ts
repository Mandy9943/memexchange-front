import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

export * from './sharedConfig';

export const API_URL = 'https://testnet-template-api.multiversx.com';
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.testnet;

export const network = {
  id: 'testnet',
  name: 'Testnet',
  egldLabel: 'xEGLD',
  walletAddress: 'https://testnet-wallet.multiversx.com',
  apiAddress:
    process.env.NEXT_PUBLIC_ELROND_API || 'https://testnet-api.multiversx.com',
  gatewayAddress: 'https://testnet-gateway.multiversx.com',
  explorerAddress: 'http://testnet-explorer.multiversx.com',
  graphQlAddress: 'https://testnet-exchange-graph.multiversx.com/graphql',
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

export const ChainID = 'T';

export const tokensID = {
  egld: 'EGLD',
  wegld: 'WEGLD-d7c6bb'
};
