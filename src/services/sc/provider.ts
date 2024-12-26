import { network } from '@/config';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';

export const provider = new ProxyNetworkProvider(network.gatewayAddress, {
  timeout: 30000
});
