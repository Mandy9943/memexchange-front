'use client';

import { adminRoutes } from '@/routes/routes';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>Admin Dashboard</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {adminRoutes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className='block p-6 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors'
          >
            <h2 className='text-xl font-semibold mb-2'>{route.title}</h2>
            <p className='text-gray-400'>
              {route.description || 'Manage and configure settings'}
            </p>
          </Link>
        ))}
      </div>

      <div className='mt-12 p-6 bg-neutral-800 rounded-lg'>
        <h2 className='text-xl font-semibold mb-4'>Quick Stats</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='p-4 bg-neutral-700 rounded-lg'>
            <div className='text-sm text-gray-400'>Total Rewards</div>
            <div className='text-2xl font-bold'>--</div>
          </div>
          <div className='p-4 bg-neutral-700 rounded-lg'>
            <div className='text-sm text-gray-400'>Active Users</div>
            <div className='text-2xl font-bold'>--</div>
          </div>
          <div className='p-4 bg-neutral-700 rounded-lg'>
            <div className='text-sm text-gray-400'>Points Awarded</div>
            <div className='text-2xl font-bold'>--</div>
          </div>
        </div>
      </div>
    </div>
  );
}
