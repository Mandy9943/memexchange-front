import { adminRoutes } from '@/routes/routes';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className='min-h-screen flex w-full'>
      {/* Sidebar */}
      <div className='w-64 bg-neutral-800 p-4'>
        <div className='mb-8'>
          <Link
            href='/'
            className='text-xl font-bold text-white hover:text-gray-300'
          >
            ← Back to Main Site
          </Link>
        </div>

        <nav>
          <div className='text-gray-400 mb-2 text-sm uppercase'>Admin Menu</div>
          <ul className='space-y-2'>
            {adminRoutes.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className='text-white hover:text-gray-300 block py-2 px-4 rounded hover:bg-neutral-700'
                >
                  {route.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className='flex-1 p-8'>{children}</div>
    </div>
  );
};
