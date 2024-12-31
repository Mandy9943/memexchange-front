import { network } from '@/config';
import { NativeAuthServerConfig } from '@multiversx/sdk-native-auth-server';

export const authConfig: NativeAuthServerConfig = {
  apiUrl: network.apiAddress,
  acceptedOrigins: [process.env.NEXT_PUBLIC_FRONTED_URL!],
  maxExpirySeconds: 86400
};
