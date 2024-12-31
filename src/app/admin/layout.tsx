import { AdminLayout } from '@/components/Layout/AdminLayout';
import { ReactNode } from 'react';

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
