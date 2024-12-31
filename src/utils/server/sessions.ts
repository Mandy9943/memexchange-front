import {
  NativeAuthDecoded,
  NativeAuthResult,
  NativeAuthServer
} from '@multiversx/sdk-native-auth-server';
import { cookies } from 'next/headers';
import { authConfig } from './constants';

const cache: Map<string, { result: NativeAuthResult | null; expiry: number }> =
  new Map();

export const verifyToken = async (
  authToken: string
): Promise<null | NativeAuthResult> => {
  const cacheEntry = cache.get(authToken);
  console.log(cacheEntry?.expiry);
  console.log(Date.now());

  if (cacheEntry && cacheEntry.expiry > Date.now()) {
    return cacheEntry.result;
  }

  const server = new NativeAuthServer(authConfig);
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    try {
      console.log('attempting to verify token');

      const valid = await server.validate(authToken);
      cache.set(authToken, {
        result: valid,
        expiry: Date.now() + 5 * 60 * 1000
      }); // Cache for 5 minutes
      return valid;
    } catch (error) {
      console.log(attempts);

      console.log(error);
      if (error instanceof Error && error.message === 'ETIMEDOUT') {
        attempts++;
        if (attempts >= maxAttempts) {
          console.log('Max retry attempts reached');
          return null;
        }
        console.log(`Retrying verification attempt ${attempts}`);
      } else {
        console.log(error);
        return null;
      }
    }
  }
  return null;
};

export const decodeToken = async (
  authToken: string
): Promise<NativeAuthDecoded> => {
  try {
    const server = new NativeAuthServer(authConfig);
    const result = await server.decode(authToken);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to decode token');
  }
};

export const getSession = async (): Promise<NativeAuthDecoded | null> => {
  const authTokenCookie = cookies().get('auth-token');

  if (!authTokenCookie?.value) {
    return null;
  }

  // verify the token
  const valid = await verifyToken(authTokenCookie.value);
  // if invalid, return null
  if (!valid) {
    return null;
  }
  // else, return the session
  return decodeToken(authTokenCookie.value);
};

export const removeSession = () => {
  cookies().delete('auth-token');
};
