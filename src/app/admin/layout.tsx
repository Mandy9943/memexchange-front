import { AdminLayout } from '@/components/Layout/AdminLayout';
import { userService } from '@/services/rest/backendApi/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function AdminRootLayout({
  children
}: {
  children: ReactNode;
}) {
  try {
    const authToken = cookies().get('auth-token');

    if (!authToken) {
      return redirect('/');
    }

    const res = await userService.getUserByAddress(authToken.value);

    if (!res?.isAdmin) {
      return redirect('/');
    }

    return <AdminLayout>{children}</AdminLayout>;
  } catch (error) {
    console.error('Error in admin layout:', error);
    return redirect('/');
  }
}
