// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client';
import { routes } from '@/routes';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export const MemeCoinNavSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={`fixed top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r-md transition-all duration-300 ease-in-out focus:outline-none z-20
        ${isOpen ? 'left-64' : 'left-0'}`}
        aria-label='Toggle navigation'
      >
        {isOpen ? (
          <ChevronLeftIcon size={24} />
        ) : (
          <ChevronRightIcon size={24} />
        )}
      </button>
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-4 transform transition-transform duration-300 ease-in-out z-10
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h2 className='text-xl font-bold mb-4'>Navigation</h2>
        <nav>
          <ul>
            {routes
              .filter((route) => route.path !== '/meme-coins')
              .map((route) => (
                <li key={route.path} className='mb-2'>
                  <Link
                    href={route.path}
                    className='flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md'
                  >
                    <route.icon className='w-5 h-5' />
                    <span>{route.title}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
