import { EnvironmentsEnum } from '@/types';

export * from './sharedConfig';

export const API_URL = 'https://devnet-template-api.multiversx.com';
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.devnet;

export const network = {
  id: 'devnet',
  name: 'Devnet',
  egldLabel: 'xEGLD',
  walletAddress: 'https://devnet-wallet.multiversx.com',
  apiAddress:
    process.env.NEXT_PUBLIC_ELROND_API || 'https://devnet-api.multiversx.com',
  gatewayAddress: 'https://devnet-gateway.multiversx.com',
  explorerAddress: 'http://devnet-explorer.multiversx.com',
  graphQlAddress: 'https://devnet-exchange-graph.multiversx.com/graphql',
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
  degenMaster: 'erd1qqqqqqqqqqqqqpgqvtxh2jy49zwqffzue4d2g7lmql4zeehqpl6seadpze'
};

export const ChainID = 'D';

export const tokensID = {
  egld: 'EGLD',
  wegld: 'WEGLD-a28c59'
};
