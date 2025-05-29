'use server';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export async function createAuthTokenCookie(token: string) {
  createCookie('auth-token', token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1)
  });
}

export const removeSession = async () => {
  (await cookies()).delete('auth-token');
};

export async function createCookie(
  key: string,
  value: string,
  options?: Partial<ResponseCookie>
) {
  (await cookies()).set(key, value, options);
}
